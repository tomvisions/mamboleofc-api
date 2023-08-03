"use strict";

import {page as PageMongoose, EventOptions, event as EventMongoose} from "../models";
//import {event as PageMongoose} from '../models/mongoDB'
//import { or } from "../db";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from ".";
import * as uuid from 'uuid';
import {FileProperties, s3Mapper} from "./s3.mapper";
import {cloudFrontMapper} from "./cloudfront.mapper";

export class PageMapper extends BaseMapper {
    private _PARAMS_BANNER_IMAGE: string = 'bannerImage';
    private _PARAMS_CONTENT: string = 'content';
    private _PARAMS_TITLE: string = 'title';
    private _PARAMS_IDENTIFIER: string = 'identifier';


    private _PARAMS_ABOUT_IMAGE: string = 'aboutImage';
    private _PARAMS_SLUG: string = 'slug';
    private _PARAMS_NEW: string = 'new';
    private _PARAMS_PAGE: string = 'page';

    private _LIST_NAME: string = 'pages';

    public async apiGetPage(queryWhere = {}) {

        try {

            console.log('get slug');
            console.log(queryWhere);

            const params =
                 {
                    slug:queryWhere['slug'],
                }


//            const params = {};
            console.log('the params');
            console.log(params);
            const result = await PageMongoose.find(params).then(page => {

                console.log('getting page');
                console.log(page);
                if (page.length) {

                    if (page.length === 1) {
                        return page[0];
                    }



                    return page;
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

    public async apiGetPages(params = {}) : Promise <string[] | string> {
        try {

            return await PageMongoose.find(params).then(pages => {
                console.log('the pages');
                console.log(pages);
                return pages;
               // return this.processArray(pages)
            }).catch (error => {
                console.log('here is an error');

                return error.toString();
            });

        } catch (error) {
            console.log('the catch');
            console.log(error);
            return error.toString()
        }
    }

    public async apiImportEvents(params) {
        console.log('the params');
        console.log(params);
        try {
            if ((await PageMongoose.find(params)).length === 0) {
                console.log('about to enter');
                console.log(params);


                return await new PageMongoose(params).save();
            }

            return await PageMongoose.find(params).then(event => {
                return this.processArray(event)
            }).catch (error => {
                return error.toString();
            });

        } catch (error) {

            return error.toString()
        }
    }

    public async apiCreatePage() {
        try {
            const test = await PageMongoose.create({identifier: uuid.v4()}
            ).then(async data => {
                console.log('good stuff');
                await cloudFrontMapper.createInvalidation("/api/v1/page*")
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
    public async apiUpdatePage(identifier, page) {
        let fileProperties: FileProperties;

        try {
          //  event.slug = page.title.replace(/\s+/g, '-').toLowerCase();

/*            if (event.bannerImage.includes('data:image')) {
                event.bannerImage = await s3Mapper.upload(event.bannerImage, 'mamboleofc/events/',`banner-image-${identifier}`);
            }

            if (event.aboutImage.includes('data:image')) {
                console.log('detected about');
                event.aboutImage = await s3Mapper.upload(event.aboutImage, 'mamboleofc/events/',`about-image-${identifier}`);
            }

            if (event.contentImage.includes('data:image')) {
                console.log('detected about');
                event.contentImage = await s3Mapper.upload(event.contentImage, 'mamboleofc/events/',`content-image-${identifier}`);
            } */

     //       console.log('the final load');
       //     console.log(event);
            //           await this.generatePrePath('/tmp/mamboleofc/avatars');
            //         fileProperties = await this.getImageReadyForUpload(`mamboleofc/events/banner-image-${identifier}`, event['bannerImage']);

            ///     event.bannerImage = `mamboleofc/events/banner-image-${identifier}.${fileProperties.extension}`

            console.log('here is the input');
            console.log('start page');
            console.log(page);
            console.log('end page');
   //         console.log({"page":page.page, where: {where: {identifier: identifier}}});

            const result = await PageMongoose.findOneAndUpdate({identifier: identifier}, page);
            await cloudFrontMapper.createInvalidation("/api/v1/page*")


            /*.then(data => {
                console.log('the ident');
                console.log(identifier);
                console.log('the input');
                console.log(page);

                console.log('the data');
                console.log(data);
                console.log('good stuff');
                return data;
            }).catch(data => {
                console.log('the data');
                console.log(data);
                console.log('did not happen');
                return false;
            });
*/
            console.log('result');
            console.log(result);
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

    get PARAMS_NEW(): string {
        return this._PARAMS_NEW;
    }

    get PARAMS_BANNER_IMAGE(): string {
        return this._PARAMS_BANNER_IMAGE;
    }

    get PARAMS_CONTENT(): string {
        return this._PARAMS_CONTENT;
    }

    get PARAMS_ABOUT_IMAGE(): string {
        return this._PARAMS_ABOUT_IMAGE;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get PARAMS_SLUG(): string {
        return this._PARAMS_SLUG;
    }

    get PARAMS_TITLE(): string {
        return this._PARAMS_TITLE;
    }

    get PARAMS_IDENTIFIER(): string {
        return this._PARAMS_IDENTIFIER;
    }

    get PARAMS_PAGE(): string {
        return this._PARAMS_PAGE;
    }
}

export const pageMapper = new PageMapper();
