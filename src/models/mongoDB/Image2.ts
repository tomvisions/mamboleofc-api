"use strict";

import {Schema} from "mongoose";
import {mongoose} from "../../db/Mongoose";
const {DataTypes, Model, sequelize} = require('../../db');
import {S3Mapper} from "../../mapper/s3.mapper";

class Image2 {
    static PARAM_FRONTCLOUD = 'https://d1rnutpibukanj.cloudfront.net';

    static resizeWithSmallAndOriginal = (image) => {
        const s3Mapper = new S3Mapper();
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
            "small":"${Image2.PARAM_FRONTCLOUD}/${signatureSmall}", 
            "original":"${Image2.PARAM_FRONTCLOUD}/${signatureOriginal}"
            }`);
    }

    public static imageSchema = new Schema(
        {
            id:{
                type: Schema.Types.String,
                primaryKey: true
            },
            name: {
                type: Schema.Types.String,
            },
            date: {
                type: Schema.Types.String,
            },
            createdAt: {
                type: Schema.Types.Date,

            },
            updatedAt: {
                type: Schema.Types.Date,

            },
            images: [
                {
                    id: {
                        type: Schema.Types.String,
                    },
                    file: {
                        type: Schema.Types.String,
                        get: this.resizeWithSmallAndOriginal,
                    },
                    image_type: {
                        type: Schema.Types.String,
                    },
                    gallery_id: {
                        type: Schema.Types.String,
                    },
                    caption: {
                        type: Schema.Types.String,
                    },

                    createdAt: {
                        type: Schema.Types.Date,
                    },
                    updatedAt: {
                        type: Schema.Types.Date,
                    }
                }]
        }
    )
}

export const imagess = mongoose.model('Imagesss', Image2.imageSchema);
