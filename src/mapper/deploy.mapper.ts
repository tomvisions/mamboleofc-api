"use strict";

import {
    page as PageMongoose,
    pageLive as PageMongooseLive,
    event as EventMongoose,
    eventLive as EventMongooseLive,
    image as ImageMongoose,
    imageLive as ImageMongooseLive,
    gallery as GalleryMongoose,
    galleryLive as GalleryMongooseLive,
    EventOptions
} from "../models";
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

        switch (section) {
            case "media":
                await this.deployMedia();
                break;

            case "page":
                await this.deployPage();
                break;
            case "event":
                console.log('thw event');
                await this.deployEvent();
                break;

            default:
                return false;

        }

        return true;

    }

    async deployEvent() {

        await EventMongoose.find().then(async page => {
            console.log('arr');
            //      console.log('the page');
            for (let item of page) {
                console.log('the item');
                //       console.log(item);
                delete item._id;
                delete item.id
                const theItem = {};

                theItem['content'] = item.content;
                theItem['about'] = item.about;
                theItem['identifier'] = item.identifier;
                theItem['slug'] = item.slug;
                theItem['name'] = item.name;
                theItem['createdAt'] = item.createdAt;
                theItem['updatedAt'] = item.updatedAt;
                theItem['aboutImage'] = item.aboutImage;
                theItem['bannerImage'] = item.bannerImage;
                theItem['intro'] = item.intro;
                theItem['contentImage'] = item.contentImage;

                console.log(item);

                await EventMongooseLive.find({ identifier:item.identifier }).deleteOne();
                const test = await EventMongooseLive.create(theItem).then(data => {
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

    }

    async deployMedia() {
        const too = await GalleryMongooseLive.find().deleteMany();
        await GalleryMongoose.find().then(async page => {
            console.log('arr');
            //      console.log('the page');
            for (let item of page) {
                console.log('the item');
                //       console.log(item);
                delete item._id;
                delete item.id
                const theItem = {};

                theItem['slug'] = item.slug;
                theItem['name'] = item.name;
                theItem['date'] = item.date;
                theItem['image'] = item.image;


                console.log(item);
                const test = await GalleryMongooseLive.create(theItem).then(data => {
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


        await ImageMongooseLive.find().deleteMany();
        await ImageMongoose.find().then(async page => {
            console.log('arr');
            //      console.log('the page');
            for (let item of page) {
                console.log('the item');
                //       console.log(item);
                delete item._id;
                delete item.id
                const theItem = {};

                theItem['date'] = item.date;
                theItem['images'] = item.images;
                theItem['slug'] = item.slug;
                theItem['name'] = item.name;
                console.log('item');
                console.log(item);
                console.log('the item');
                console.log(theItem);
                const test = await ImageMongooseLive.create(theItem).then(data => {
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

    }

    async deployPage() {
        const too = await PageMongooseLive.find().deleteMany();
        console.log('result');
        console.log(too);
        await PageMongoose.find().then(async page => {
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
//                await EventMongooseLive.find({ identifier:item.identifier }).deleteOne();

                await PageMongooseLive.create(theItem).then(data => {
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

    get PARAMS_SECTION(): string {
        return this._PARAMS_SECTION;
    }
}

export const deployMapper = new DeployMapper();
