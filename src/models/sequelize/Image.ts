"use strict";
import {s3Mapper} from "../../mapper/s3.mapper";

const {DataTypes, Model,sequelize} =  require('../../db');

class Image extends Model {
    static PARAM_FRONTCLOUD = 'https://d1rnutpibukanj.cloudfront.net'
    private file;
}

Image.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    file: {
        type: DataTypes.STRING,
        get(this: Image): string {
            const rawValue = this.getDataValue('file');
            const signatureSmall = s3Mapper.resizeWithInS3(rawValue, {
                "resize": {
                    "width": 200,
                    "height": 200,
                    "fit": "inside"
                }
            });

            const signatureOriginal = s3Mapper.resizeWithInS3(rawValue, {
                "resize": {
                    "height": 600,
                    "fit": "inside"
                }
            });

            return JSON.parse(`{
            "small":"${Image.PARAM_FRONTCLOUD}/${signatureSmall}", 
            "original":"${Image.PARAM_FRONTCLOUD}/${signatureOriginal}"
            }`);
        },
    },

    image_type: {
        type: DataTypes.STRING,
    },
    gallery_id: {
        type: DataTypes.NUMBER,
    },
    caption: {
        type: DataTypes.STRING,
    },

    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Image',  sequelize, tableName:"image"
})

export {Image}
