"use strict";

import {Team} from "../models";
import { or } from "../db";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from "./base.mapper";

export class TeamMapper extends BaseMapper {
    private _PARAMS_NAME: string = 'name';
    private _PARAMS_DESCRIPTION: string = 'description';
    private _LIST_NAME: string = 'teams';
    private _DEFAULT_SORT: string = 'name';


    /**
     * Getting all the teams function
     * @param params
     */
    public async apiGetTeams(params = {}) {

        try {
            return await Team.findAll(params).then(data => {
                return this.processArray(data);

            }).catch(error => {

                return error.toString();
            });

        } catch (error) {

            return error.toString();
        }

    }

    public async apiCreateTeam(params) {
        try {

//            console.log(orStatement);
            console.log('in team create');
         //   params.creaedAt =
            console.log(params);
            console.log(JSON.parse(params));
            const result = await Team.findOrCreate({
                where: or(JSON.parse(params)),
                defaults: JSON.parse(params),
            }).then(data => {
                console.log('found it');
                console.log(data);
                console.log(params);
                return false;

            }).catch(data => {
                console.log('the catch');
                console.log(data);
                console.log(params);

                return true;
            });

            return result;

        } catch (error) {
            console.log(`Could not fetch users ${error}`);
            return false;
        }
    }

    /**
     * Generates a JWT token using CryptoJS library.
     *
     * This generator is for mocking purposes only and it is NOT
     * safe to use it in production frontend applications!
     *
     * @private
     */
    static generateJWTToken(): string
    {
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
        let signature: any = encodedHeader + '.' + encodedPayload;
        signature = HmacSHA256(signature, 'YOUR_VERY_CONFIDENTIAL_SECRET_FOR_SIGNING_JWT_TOKENS!!!');
        signature = this._base64url(signature);

        // Build and return the token
        return encodedHeader + '.' + encodedPayload + '.' + signature;
    }

    /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     */
    static _base64url(source: any): string
    {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        // Return the base64 encoded string
        return encodedSource;
    }


    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

    get PARAMS_DESCRIPTION(): string {
        return this._PARAMS_DESCRIPTION;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }
}

export const teamMapper = new TeamMapper();
