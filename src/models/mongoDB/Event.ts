import {Schema} from "mongoose";
import {mongoose} from "../../db/Mongoose";

const {DataTypes, Model, sequelize} = require('../../db');

export interface EventOptions {
    name: String,
    content: String,
    slug: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    image: String,
}


class Event {


    public static eventSchema = new Schema({
        name: {
            type:  Schema.Types.String,
        },
        content: {
            type:  Schema.Types.String,
        },
        slug: {
            type:  Schema.Types.String,
        },
        date: {
            type: Schema.Types.Date,
        },
        createdAt: {
            type: Schema.Types.Date,
        },
        updatedAt: {
            type: Schema.Types.Date,
        },
        identifier: {
            type: Schema.Types.String,
        },
        contentImage: {
            type: Schema.Types.String,
        },
        about: {
            type: Schema.Types.String,
        },
        aboutImage: {
            type: Schema.Types.String,
        },
        bannerImage: {
            type: Schema.Types.String,
        },
    })
}

export const event = mongoose.model('Events', Event.eventSchema);


//Game.TeamModel = Game.belongsTo(TeamModel,  {foreignKey: 'team', onUpdate: 'cascade'});
