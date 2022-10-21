import {model, Schema} from "mongoose";
import passwordHash from "password-hash";
import {ErrorCodes, ErrorConstructor} from "../../utils/errorHandler";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {nanoid} from "nanoid";
import {userModel} from "../user/schema";
import {activateTokenModel} from "./schema";

export default class AuthService {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    captchaToken?: string;

    constructor(user?: {
        name: string;
        surname: string;
        email: string;
        password: string;
    }) {
        this.name = user?.name;
        this.surname = user?.surname;
        this.email = user?.email;
        this.password = user?.password;
    }

    async register() {
        if (!this.password || !this.email || !this.name || !this.surname) {
            return null;
        }

        const hashedPassword = passwordHash.generate(this.password);

        const foundUser = await userModel.findOne({email: this.email})
        if (foundUser && foundUser.active) {
            throw ErrorConstructor(0, 'This user already exists');
        }

        const userInstance = await userModel.findOneAndUpdate({email: this.email}, {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: hashedPassword
        }, {upsert: true, new: true});

        let activateUserToken = nanoid(48);
        while (await activateTokenModel.findOne({token: activateUserToken})) {
            activateUserToken = nanoid(48);
        }

        const tokenInstance = new activateTokenModel({token: activateUserToken, user: userInstance._id});
        await tokenInstance.save();

        await this.sendActivationLink(activateUserToken);
    }

    async login() {
        if (!this.password || !this.email) {
            return null;
        }
        const user = await userModel.findOne({email: this.email}).select("+password");

        if (!user || !user.active || !passwordHash.verify(this.password, user.password as string)) {
            throw ErrorConstructor(1, 'Unauthorized', 401)
        }

        return jwt.sign({id: user._id}, process.env.JWT_SECRET as string)
    }

    async activateUser(token: string) {
        const tokenInstance = await activateTokenModel.findOneAndDelete({token: token});
        if (!tokenInstance) {
            throw ErrorConstructor(2, 'Activation token not valid', 409);
        }

        const userInstance = await userModel.findByIdAndUpdate(tokenInstance.user, {active: true});

        if (!userInstance) {
            throw ErrorConstructor(2, 'Activation token not valid', 409);
        }

    }

    private async sendActivationLink(activationID: string) {

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"e-Sąsiad" <${process.env.MAIL_USER}>`,
            to: this.email,
            subject: 'Aktywacja systemu e-Sąsiad',
            text: `Aby zaktywować konto w systemie e-Sąsiad przejdź pod adres: https://e-sasiad.pl/activate?code=${activationID}`
        })
    }
}