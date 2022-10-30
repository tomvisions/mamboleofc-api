const {DataTypes, Model} = require("sequelize");
import {sequelize} from '../db/Sequelize';
import {Access, TeamUser} from '.';
import {S3Mapper} from "../mapper/s3.mapper";

class User extends Model {
    static PARAM_FRONTCLOUD = 'https://d1rnutpibukanj.cloudfront.net'

    private avatar:string;
}

User.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    avatar: {
        get(this:User): string {
            const rawValue = this.getDataValue('avatar');
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
        type: DataTypes.STRING,
    },
    AccessId: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize, tableName: "user"
});

User.TeamUser = User.hasMany(TeamUser, {as: 'teams', foreignKey: 'UserId', onUpdate: 'cascade'});
User.Access = User.hasOne(Access, {sourceKey: "AccessId", as: 'access', foreignKey: 'slug', onUpdate: 'cascade'});

export {User}

