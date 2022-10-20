import fetch from "cross-fetch";
import {ErrorConstructor} from "../../utils/errorHandler";
import {groupModel, IGroup} from "./schema";
import {getDistance} from 'geolib';

export default class GroupService {

    async create(latitude: number, longitude: number) {

        const position = await this.getInformationsAboutPosition(latitude, longitude);

        if (position.items[0].address.countryCode !== "POL") {
            throw ErrorConstructor(4, 'Latitude and longitude not supported');
        }

        const nearestGroups = await this.getNearestGroups(latitude, longitude);

        if (nearestGroups.length > 0) {
            throw ErrorConstructor(5, 'There is already a group near you');
        }



        const newGroup = new groupModel({centerCoordinates: {latitude: position.items[0].position.lat, longitude: position.items[0].position.lng}});

        await newGroup.save();



    }

    async getNearestGroups(latitude: number, longitude: number) {

        const allGroups = await groupModel.find({}).exec() as IGroup[];
        const nearestGroups: IGroup[] = [];

        allGroups.forEach(group => {
            const distance = getDistance(
                {latitude: latitude, longitude: longitude},
                {latitude: group.centerCoordinates.latitude, longitude: group.centerCoordinates?.longitude}
            );
            if (distance <= 1000) {
                nearestGroups.push(group);
            }
        });

        return nearestGroups;
    }


    async getInformationsAboutPosition(latitude: number, longitude: number) {

        const response = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=pl-PL&apiKey=${process.env.HERE_API_KEY}`,
            {method: 'GET'});
        if (!response.ok)
            return null;
        return await response.json();
    }
}