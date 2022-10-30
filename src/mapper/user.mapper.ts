"use strict";
import {BaseMapper} from "./base.mapper";

import {Access, Gallery, TeamUser, User} from "../models";
//import { User} from "../models";
import {or} from "../db";

import dotenv from 'dotenv';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {Model} from "sequelize";

//const {DataTypes, Model} = require("sequelize");

export class UserMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_EMAIL: string = 'email';
    private _PARAMS_PASSWORD: string = 'password';
    private _PARAMS_USERNAME: string = 'username';
    private _PARAMS_USER: string = 'user';
    private _LIST_NAME: string = 'users';
    private _DEFAULT_SORT: string = 'username';


    public async apiUpdateUser(params) {
        try {
            const userUpdate = params['user'];
            const id = params['id'];

            const teams = userUpdate['teams'];
            await TeamUser.destroy({where: {UserId: id}});


            for (let team in teams) {
                const teamUserUpdateResult = await TeamUser.create({"TeamId": teams[team], "UserId": id}).then(data => {
                    return true;
                }).catch(data => {
                    return false;
                });

                if (!teamUserUpdateResult) {
                    return false;
                }
            }

            const userUpdateResult = await User.update(userUpdate, {where: {id: id}}).then(data => {
                return true;
            }).catch(data => {
                return false;
            });

            return userUpdateResult;

        } catch (error) {
            console.log('catch');
            console.log(error);
            return error;
        }
    }

    public async apiSignUp(params) {
        try {

            const result = await User.findOrCreate({
                where: or(JSON.parse(params)),
                defaults: JSON.parse(params),
            }).then(data => {

                return false;

            }).catch(data => {

                return true;
            });

            return result;

        } catch (error) {
            console.log(`Could not fetch users ${error}`);
            return false;
        }
    }

    /**
     *
     * @param params
     */
    async getUserBasedOnPassword(params) {
        // get config vars
        dotenv.config();
        console.log('the secret');
        console.log(process.env.TOKEN_SECRET);
        try {

            const userParams = {
                where: {
                    email: params.email,
                    password: params.password
                },
                include: [{
                    association: User.Access,
                    as: 'access'
                }]
            };

            return await User.findAll(userParams).then(data => {
                if (data.length === 1) {
                    return {
                        user: {
                            username: data[0].username,
                            email: data[0].email,
                            access: {
                                name: data[0].access.dataValues.name,
                                level: data[0].access.dataValues.level,
                                slug: data[0].access.dataValues.slug
                            }
                        },
                        accessToken: this.generateJWTToken(),
                        tokenType: 'bearer',
                    }
                } else {

                    return false;
                }
            });
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    public async getAllUsers() : Promise <string[] | string> {
        try {
            const params = {
                include: [{
                    association: User.TeamUser,
                    as: 'teams'
                },
                    {
                        association: User.Access,
                        as: 'access'
                    }]
            };

            return await User.findAll(params).then(users => {
                return this.processArray(users);
            }).catch(error => {
                return error.toString();
            });

        } catch (error) {
            return error.toString() //["error" => error.toString()];
        }
    }


    /**
     * Generates a JWT token using CryptoJS library.
     *
     * This generator is for mocking purposes only and it is NOT
     * safe to use it in production frontend applications!
     *
     * @private
     *//*
    private generateJWTToken(): string {

        dotenv.config();
        // Define token header
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };

        // Calculate the issued at and expiration dates
        const date = new Date();
        const iat = Math.floor(date.getTime() / 1000);
        const exp = Math.floor((date.setDate(date.getDate() + 7)) / 1000);

        // Define token payload
        const payload = {
            iat: iat,
            iss: 'Fuse',
            exp: exp
        };

        // Stringify and encode the header
        const stringifiedHeader = Utf8.parse(JSON.stringify(header));
        const encodedHeader = this._base64url(stringifiedHeader);

        // Stringify and encode the payload
        const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
        const encodedPayload = this._base64url(stringifiedPayload);

        // Sign the encoded header and mock-api
        // Sign the encoded header and mock-api
        let signature: any = encodedHeader + '.' + encodedPayload;
        signature = HmacSHA256(signature, process.env.TOKEN_SECRET);
        signature = this._base64url(signature);

        // Build and return the token
        return encodedHeader + '.' + encodedPayload + '.' + signature;
    }

    /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     *//*
    private _base64url(source: any): string {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        // Return the base64 encoded string
        return encodedSource;
    } */

    get PARAMS_ID(): string {
        return this._PARAMS_ID;
    }

    get PARAMS_EMAIL(): string {
        return this._PARAMS_EMAIL;
    }

    get PARAMS_PASSWORD(): string {
        return this._PARAMS_PASSWORD;
    }

    get PARAMS_USERNAME(): string {
        return this._PARAMS_USERNAME;
    }

    get PARAMS_USER(): string {
        return this._PARAMS_USER;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }
}

export const userMapper = new UserMapper();
