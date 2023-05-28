"use strict";
import {mongoose, mongooseLive} from "../db/Mongoose";
import {Schema, model, Model} from "mongoose";
import {s3Mapper} from "../mapper/s3.mapper";
import {Base} from ".";

const moment = require('moment');


class Image extends Base {
    static dateGenerate = (date = null) => {
        return moment().format('YYYY-MM-DD')
    }

    static generateSmallAndOriginal = (image) => {
        const signatureSmall = s3Mapper.resizeWithInS3(image, {
            "resize": {
                "width": 200,
                "height": 200,
                "fit": "inside"
            }
        });

        const signatureOriginal = s3Mapper.resizeWithInS3(image, {
            "resize": {
                "height": 600,
                "fit": "inside"
            }
        });

        return JSON.parse(`{
            "small":"${Base.PARAM_FRONTCLOUD}/${signatureSmall}",
            "original":"${Base.PARAM_FRONTCLOUD}/${signatureOriginal}"
            }`);
    }

    public static imagesSchema = new Schema( {
        id: {type: Schema.Types.String},
        image_type: {type: Schema.Types.String},
        gallery_slug: {type: Schema.Types.String},
        file: { type: Schema.Types.Mixed, get: this.generateSmallAndOriginal },
        caption: {type: Schema.Types.String},
        createdAt: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
        updatedAt: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
    }, {toJSON: {getters: true}, toObject: { getters: true }});

    public static GalleryScheme = new Schema({
        slug: {
            type: Schema.Types.String,
        },
        name: {
            type: Schema.Types.String,
        },
        date: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
        createdAt: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
        updatedAt: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
        images: [this.imagesSchema],
    }, {toJSON: {getters: true}, toObject: { getters: true }})
}

export const image = mongoose.model('Image', Image.GalleryScheme);
export const imageLive = mongooseLive.model('Image', Image.GalleryScheme);
