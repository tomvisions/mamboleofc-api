//const {generateInitObject} = require('./generateInitObject');
//import {Team} from "./Team";
const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../db/Sequelize");
//const Team = require("tomvisions-model");
//const modelInit = generateInitObject(new Team.Team());

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
    },
    location: {
        type: DataTypes.STRING,
    },
    hours: {
        type: DataTypes.STRING,
    },
    minutes: {
        type: DataTypes.STRING,
    },
    createdAt:{
        type: DataTypes.DATE,
    },
    updatedAt:{
        type: DataTypes.DATE,
    },


}, {
    modelName: 'Game', sequelize: sequelize, tableName:"game"
})

//Game.Team = Game.belongsTo(Team,  {foreignKey: 'team', onUpdate: 'cascade'});

export {Game};
