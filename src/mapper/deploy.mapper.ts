"use strict";

import {page as PageMongoose, pageLive as PageMongooseLive, EventOptions, event as EventMongoose} from "../models";
//import {event as PageMongoose} from '../models/mongoDB'
//import { or } from "../db";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from ".";
import * as uuid from 'uuid';
import {FileProperties, s3Mapper} from "./s3.mapper";

export class DeployMapper extends BaseMapper {
    private _PARAMS_SECTION: string = 'section';


    private _LIST_NAME: string = 'pages';

    public async apiDeployChanges(section: string = null) {

        try {
            await PageMongoose.find().then( async page => {
                console.log('arr');
                    //      console.log('the page');
                    for (let item of page) {
                        console.log('the item');
                 //       console.log(item);
                        delete item._id;
                        delete item.id
                        const theItem = {};

                        theItem['content'] = item.content;
                        theItem['identifier'] = item.identifier;
                        theItem['slug'] = item.slug;
                        theItem['title'] = item.title;

                        console.log(item);
                            const test =  await PageMongooseLive.create(theItem).then(data => {
                                console.log('good stuff');
                                console.log(data);
                                return data;

                            }).catch(data => {
                                console.log('bad stuff');
                                console.log(data);
                                return false;
                            });

                    }
                });

            return true;

        } catch (error) {
            console.log(`Could not find stuff`);
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

    get PARAMS_SECTION(): string {
        return this._PARAMS_SECTION;
    }
}

export const deployMapper = new DeployMapper();
