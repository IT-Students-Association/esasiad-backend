import fetch from "cross-fetch";
import {ErrorConstructor, eSasiadError} from "../../utils/errorHandler";
import {groupModel, IGroup} from "./schema";
import {getDistance} from 'geolib';
import {ObjectId} from "mongodb";
import Post from "../post";

export default class GroupService {

    async create(lng: number, lat: number, title: string) {

        const position = await this.getInformationsAboutPosition(lat, lng);

        if (position.items[0].address.countryCode !== "POL") {
            throw ErrorConstructor(4, 'Latitude and longitude not supported');
        }

        const nearestGroups = await this.getNearestGroups(lng, lat);

        if (nearestGroups.length > 0) {
            throw ErrorConstructor(5, 'There is already a group near you');
        }

        const newGroup = new groupModel({loc: {coordinates: [position.items[0].position.lng, position.items[0].position.lat], type: 'Point'}, title: title});

        return await newGroup.save();

    }

    async getNearestGroups(lng: number, lat: number) {
        console.log([lng, lat]);
        return groupModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: 10000
                }
            }
        ]);

    }

    async getInformationsAboutPosition(latitude: number, longitude: number) {

        const response = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=pl-PL&apiKey=${process.env.HERE_API_KEY}`,
            {method: 'GET'});
        if (!response.ok)
            return null;
        return await response.json();
    }

    async findGroupById(groupId: ObjectId){

        const group = await groupModel.findById(groupId);
        if(!group){
            throw new eSasiadError(6, 'group not found');
        }
        return group;
    }
}