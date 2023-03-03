//const {generateInitObject} = require('./generateInitObject');
//import {INTEGER} from "sequelize/dist/lib/data-types";

//const {Model, or, DataTypes} = require("sequelize");
const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../../db/Sequelize");

//const modelInit = generateInitObject(new Team.Team());

class TeamUser extends Model {}

TeamUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    TeamId: {
        type: DataTypes.INTEGER,
    },
    UserId: {
        type: DataTypes.INTEGER,
    },
}, {
    modelName: 'TeamUser', sequelize: sequelize, tableName:'team_user'
})
//console.log(modelInit);
export { TeamUser }
