"use strict";
import {S3Mapper} from "../mapper/s3.mapper";

const {DataTypes, Model,sequelize} =  require('../db');

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
            const s3Mapper = new S3Mapper();
            const signature = s3Mapper.resizeWithInS3(rawValue, {
                "resize": {
                    "width": 130,
                    "height": 130,
                    "fit": "cover"
                }
            });

            return `${this.PARAM_FRONTCLOUD}/${signature}`;
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
