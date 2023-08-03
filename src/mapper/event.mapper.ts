"use strict";

import {event as EventMongoose, EventOptions} from "../models";
//import {event as EventMongoose} from '../models/mongoDB'
//import { or } from "../db";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from ".";
import * as uuid from 'uuid';
import {FileProperties, s3Mapper} from "./s3.mapper";
import crypto from "crypto"
import {cloudFrontMapper} from "./cloudfront.mapper";

export class EventMapper extends BaseMapper {
    private _PARAMS_SLUG: string = 'slug';
    private _PARAMS_NAME: string = 'name';
    private _PARAMS_LINK: string = 'link';
    private _PARAMS_ABOUT: string = 'about';
    private _PARAMS_BANNER_IMAGE: string = 'bannerImage';
    private _PARAMS_CONTENT: string = 'content';
    private _PARAMS_NEW: string = 'new';
    private _PARAMS_DATE: string = 'date';
    private _PARAMS_EVENT: string = 'event';
    private _PARAMS_IDENTIFIER: string = 'identifier';
    private _LIST_NAME: string = 'events';
    private _DEFAULT_SORT: string = 'name';

    public async apiGetEvent(queryWhere = {}) {

        try {

//            console.log('get event');
            //          console.log(queryWhere);

            const params = {

                slug: queryWhere['slug'],

            };

            const result = await EventMongoose.find(params).then(events => {

                if (events.length) {

                    if (events.length === 1) {
                        return events[0];
                    }

                    return events;
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

    public async apiGetEvents(params = {}): Promise<string[] | string> {
        try {

            return await EventMongoose.find(params).then(event => {
                return event;
//                return this.processArray(event)
            }).catch(error => {

                return error.toString();
            });

        } catch (error) {
            console.log(error);
            return error.toString()
        }
    }

    public async apiImportEvents(params) {
        try {
            if ((await EventMongoose.find(params)).length === 0) {

                return await new EventMongoose(params).save();
            }

            return await EventMongoose.find(params).then(event => {
                return this.processArray(event)
            }).catch(error => {
                return error.toString();
            });

        } catch (error) {

            return error.toString()
        }
    }


    public async apiUpdateGame(id, game) {
        try {
            return true;
            /*            console.log('in mapper');
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
            */
        } catch (error) {
            console.log(`Could not update games ${error}`);
            return false;
        }
    }


    public async apiCreateEvent() {
        try {
            const test = await EventMongoose.create({identifier: uuid.v4()}
            ).then(async data => {
                await cloudFrontMapper.createInvalidation("/api/v1/event*")
                console.log('good stuff');
                return data;

            }).catch(data => {
                console.log('bad stuff');
                console.log(data);
                return false;
            });
            console.log('the test');
            console.log(test);
            return test;

        } catch (error) {
            console.log(`Could not create event ${error}`);
            return false;
        }
    }

    /**
     * @param identifier
     * @param event JSON
     */
    public async apiUpdateEvent(identifier, event) {
        let fileProperties: FileProperties;

        try {

            event.slug = event.name.replace(/\s+/g, '-').toLowerCase();
            const random = crypto.randomBytes(20).toString('hex');
            if (event.bannerImage.includes('data:image')) {
                event.bannerImage = await s3Mapper.upload(event.bannerImage, 'mamboleofc/events/', `banner-image-${identifier}-${random}`);
            }

            if (event.aboutImage.includes('data:image')) {
                event.aboutImage = await s3Mapper.upload(event.aboutImage, 'mamboleofc/events/', `about-image-${identifier}-${random}`);
            }

            if (event.contentImage.includes('data:image')) {
                event.contentImage = await s3Mapper.upload(event.contentImage, 'mamboleofc/events/', `content-image-${identifier}-${random}`);
            }

            //           await this.generatePrePath('/tmp/mamboleofc/avatars');
            //         fileProperties = await this.getImageReadyForUpload(`mamboleofc/events/banner-image-${identifier}`, event['bannerImage']);

            ///     event.bannerImage = `mamboleofc/events/banner-image-${identifier}.${fileProperties.extension}`

            const result = await EventMongoose.findOneAndUpdate({identifier: identifier}, event);
            await cloudFrontMapper.createInvalidation("/api/v1/event*")
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
    static generateJWTToken(): string {
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
    static _base64url(source: any): string {
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


    get PARAMS_NEW(): string {
        return this._PARAMS_NEW;
    }

    get PARAMS_LINK(): string {
        return this._PARAMS_LINK;
    }

    get PARAMS_ABOUT(): string {
        return this._PARAMS_ABOUT;
    }

    get PARAMS_BANNER_IMAGE(): string {
        return this._PARAMS_BANNER_IMAGE;
    }

    get PARAMS_EVENT(): string {
        return this._PARAMS_EVENT;
    }


    get PARAMS_IDENTIFIER(): string {
        return this._PARAMS_IDENTIFIER;
    }
}

export const eventMapper = new EventMapper();
