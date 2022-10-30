"use strict";

import {Event, User} from "../models/";
import { or } from "../db";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from ".";

export class EventMapper extends BaseMapper{
    private _PARAMS_SLUG: string = 'slug';
    private _PARAMS_NAME: string = 'name';
    private _PARAMS_CONTENT: string = 'content';
    private _PARAMS_DATE: string = 'date';
    private _LIST_NAME: string = 'events';
    private _DEFAULT_SORT: string = 'name';

    public async apiGetEvent(queryWhere = {}) {

        try {

            console.log('get event');
            console.log(queryWhere);

            const params = {
                where: {
                    slug:queryWhere['slug'],
                }
            };

//            const params = {};

            const result = await Event.findAll(params).then(events => {
                if (events.length) {
                    const eventArray = [];
                    for (let event of events) {
                        eventArray.push(event['dataValues']);
                    }

                    return eventArray;

                } else {

                    return false;
                }
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

    public async apiGetEvents(params = {}) : Promise <string[] | string> {
        try {
            return await Event.findAll(params).then(event => {
                return this.processArray(event)
                }).catch (error => {
                return error.toString();
            });

        } catch (error) {

            return error.toString()
        }
    }

    public async apiUpdateGame(id, game) {
        try {
            console.log('in mapper');
            console.log(game);
            console.log('dd');
            //   console.log(JSON.parse(game));

            const result = await Event.upsert(
                game
            ).then(data => {
                console.log('good');
                console.log(data);

                console.log('dara');
                return data;

            }).catch(data => {
                console.log('error in catch');
                console.log(data);
                return false;
            });

            return result;

        } catch (error) {
            console.log(`Could not update games ${error}`);
            return false;
        }
    }

    /**
     *
     * @param body JSON
     */
    public async apiCreateEvent(body) {
        try {
            body.slug = body.name.replace(/\s+/g, '-').toLowerCase();
            console.log('body');
            console.log(body);
            const result = await Event.create(
                body
            ).then(data => {
                console.log('good stuff');
                return data;

            }).catch(data => {
                console.log('bad stuff');
                console.log(data);
                return false;
            });

            return result;

        } catch (error) {
            console.log(`Could not create event ${error}`);
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
    
    get PARAMS_SLUG(): string {
        return this._PARAMS_SLUG;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

    get PARAMS_CONTENT(): string {
        return this._PARAMS_CONTENT;
    }

    get PARAMS_DATE(): string {
        return this._PARAMS_DATE;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }
}

export const eventMapper = new EventMapper();
