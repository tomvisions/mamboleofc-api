//const {generateInitObject} = require('./generateInitObject');
const {DataTypes, Model} = require ("sequelize");
const {sequelize} = require("../db/Sequelize");
//import {TeamUser} from "./TeamUser";
import {User} from "./sequelize"
//export const test = sequelize.define({

//}).associations();
class Roster extends Model {
    static PARAMS_ID: string = 'id';
    static PARAMS_GAME: string = 'game_id';
    static PARAMS_USER: string = 'user_id';
}

Roster.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    gameId: {
        type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    modelName: 'Roster', sequelize: sequelize, tableName:"roster"
});

Roster.User = Roster.hasMany(User, {sourceKey:'userId', foreignKey: 'id', onUpdate: 'cascade'});

export { Roster };
