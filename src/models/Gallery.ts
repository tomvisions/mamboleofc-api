"use strict";

import {mongoose, mongooseLive} from "../db/Mongoose";
import {Schema, model, Model} from "mongoose";
import {s3Mapper} from "../mapper/s3.mapper";
//import {Image} from "../sequelize";
import {Base} from ".";

const moment = require('moment');


class Gallery extends Base {
    static dateGenerate = (date = null) => {
        console.log('here');
        return moment().format('YYYY-MM-DD')
    }

    static imageSmall = (image) => {
        console.log('small');
        return `${Base.PARAM_FRONTCLOUD}/${s3Mapper.resizeWithInS3(image, {
            "resize": {
                "width": 200,
                "height": 200,
                "fit": "inside"
            }
        })}`;
    }

    public static gallerySchema = new Schema({
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
        image: {
            id: {type: Schema.Types.String},
            image_type: {type: Schema.Types.String},
            gallery_id: {type: Schema.Types.String},
            file: {type: Schema.Types.String, get: this.imageSmall},
            caption: {type: Schema.Types.String},
            createdAt: {
                type: Schema.Types.Date,
                set: this.dateGenerate
            },
            updatedAt: {
                type: Schema.Types.Date,
                set: this.dateGenerate
            },
        }
    }, {toJSON: {getters: true}})
}

export const gallery = mongoose.model('Gallery', Gallery.gallerySchema);
export const galleryLive = mongooseLive.model('Gallery', Gallery.gallerySchema);

//let g = new Gallery();
//gallery.image
