const {DataTypes, Model} = require("sequelize");
import {sequelize} from '../db/';
import {Access, TeamUser} from '.';
import {S3Mapper} from "../mapper/s3.mapper";

class User extends Model {
    static PARAM_FRONTCLOUD = 'https://images.mamboleofc.ca'

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
            console.log('the avatar');
            console.log(rawValue);
            console.log('the url');
            console.log(`${User.PARAM_FRONTCLOUD}`);
            const s3Mapper = new S3Mapper();
            const signature = s3Mapper.resizeWithInS3(rawValue, {
                "resize": {
                    "width": 130,
                    "height": 130,
                    "fit": "cover"
                }
            });

            return `${User.PARAM_FRONTCLOUD}/${signature}`;
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

