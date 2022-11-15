"use strict";

import {FileProperties, S3Mapper} from "./s3.mapper";

const moment = require('moment');
import {Image} from "../models/";
import * as uuid from 'uuid';

export class ImageMapper extends S3Mapper {

    async getImagesByGalleryId(galleryId: string = null) {

        try {
            const paramsWhere = {
                where: JSON.parse(`{
                    "gallery_id":"${galleryId}"
                }`)
            };
            console.log(paramsWhere);
            return await Image.findAll(paramsWhere).then(images => {

                const imageArray = [];

                for (let image of images) {
                    imageArray.push(image.get());
                }

//                console.log(imageArray);
                return imageArray;
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch galleries ${error}`)
        }
    }

    async getPrimaryImageByGalleryId(galleryId: Number = null) {
        try {
            const paramsWhere = {
                where: JSON.parse(`{
                    "gallery_id":"${galleryId}",
                    "primary":1 
                }`)
            };
            return await Image.findAll(paramsWhere).then(images => {

                const imageArray = [];

                for (let image of images) {
                    imageArray.push(image.get());
                }

                return imageArray;
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch galleries ${error}`)
        }
    }

    async uploadImage(body) {
        try {
            let fileProperties: FileProperties
            const id = uuid.v4();
            await this.generatePrePath(`/tmp/mamboleofc/gallery/${body.gallery_id}`);

            fileProperties = await this.getImageReadyForUpload(`mamboleofc/gallery/${body.gallery_id}/${id}`, body.file);

            console.log(body);
            const image = {
                id: id,
                file: `mamboleofc/gallery/${body.gallery_id}/${id}.${fileProperties.extension}`,
                gallery_id: body.gallery_id,
                createdAt: moment().format('YYYY-MM-DD'),
                updatedAt: moment().format('YYYY-MM-DD'),
                image_type: fileProperties.image_type
            };

            return await Image.create(image).then(data => {
                return data;
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch galleries ${error}`)
        }
    }

    async uploadImages(body) {
        let fileProperties: FileProperties
        try {
            const images = JSON.parse(body.files);

            for (let image of images) {
                const id = uuid.v4();
                await this.generatePrePath(`/tmp/mamboleofc/gallery/${body.gallery}`);

                fileProperties = await this.getImageReadyForUpload(`mamboleofc/gallery/${body.gallery}/${id}`, image);

                let gallery_params = {
                    id: id,
                    file: `mamboleofc/gallery/${body.gallery}/${id}.${fileProperties.extension}`,
                    gallery_id: body.gallery,
                    image_type: fileProperties.image_type
                }

                await Image.create(gallery_params).then(data => {

                    return {'success': data.toString()}
                }).catch(err => {
                    return {'error': err.toString()}
                })
            }

            return {};
        } catch (error) {
            return {result: "error", message: error.toString()}
        }
    }
}

export const imageMapper = new ImageMapper();
