import {Schema} from "mongoose";

const {DataTypes, Model, sequelize} = require('../db');

class Event extends Model {}
export const EventOptions = {
    name: String,
    content: String,
    slug: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    bannerImage: String,
    aboutImage: String,
}

Event.init({
    name: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    contentImage: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.STRING,
    },
    aboutImage: {
        type: DataTypes.STRING,
    },
    bannerImage: {
        type: DataTypes.STRING,
    },
    identifier: {
        type: DataTypes.STRING,
    },
}, {
    modelName: 'Event', sequelize: sequelize, tableName:"event"
})

//Game.TeamModel = Game.belongsTo(TeamModel,  {foreignKey: 'team', onUpdate: 'cascade'});

export {Event};
