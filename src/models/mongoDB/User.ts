//const {DataTypes, Model} = require("sequelize");
//import {sequelize} from '../db/Sequelize';
import {S3Mapper} from "../../mapper/s3.mapper";
import {mongoose} from "../../db/Mongoose";
import {Schema, model, Model} from "mongoose";
const moment = require('moment');

export interface UserModel {
    username:string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string

}

class User {
    private static _PARAM_FRONTCLOUD = 'https://d1rnutpibukanj.cloudfront.net'
    static resizeWithInS3130x130 = (avatar) => {
        const s3Mapper = new S3Mapper();
        const signature = s3Mapper.resizeWithInS3(avatar, {
            "resize": {
                "width": 130,
                "height": 130,
                "fit": "cover"
            }
        });

        return `${User._PARAM_FRONTCLOUD}/${signature}`;
    }

    static dateGenerate = (date = null) => {
        console.log('here');
        return moment().format('YYYY-MM-DD')
    }

    public static userSchema = new Schema({
        id: {
            type: Schema.Types.String,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Schema.Types.String,
        },
        password: {
            type: Schema.Types.String,
        },
        email: {
            type: Schema.Types.String,
        },
        avatar: {
            type: Schema.Types.String,
            get: this.resizeWithInS3130x130,
        },
        AccessId: {
            type: Schema.Types.String,
        },
        createdAt: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
        updatedAt: {
            type: Schema.Types.Date,
            set: this.dateGenerate
        },
    })

}
/*
const resizeWithInS3130x130 = (avatar) => {
    const PARAM_FRONTCLOUD = 'https://d1rnutpibukanj.cloudfront.net'
    const s3Mapper = new S3Mapper();
    const signature = s3Mapper.resizeWithInS3(avatar, {
        "resize": {
            "width": 130,
            "height": 130,
            "fit": "cover"
        }
    });

    return `${PARAM_FRONTCLOUD}/${signature}`;
}
 */

export const user = mongoose.model('User', User.userSchema);
//const User = mongoose.model('User', userSchema);
//const user = new Uu({avatar})

//User.TeamUser = User.hasMany(TeamUser, {as: 'teams', foreignKey: 'UserId', onUpdate: 'cascade'});
//User.Access = User.hasOne(Access, {sourceKey: "AccessId", as: 'access', foreignKey: 'slug', onUpdate: 'cascade'});

