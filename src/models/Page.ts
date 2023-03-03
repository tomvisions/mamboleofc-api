import {Schema} from "mongoose";
import {mongoose} from "../db/Mongoose";

export interface PageOptions {
    name: String,
    content: String,
    slug: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    image: String,
}


class Page {

    public static pageSchema = new Schema({
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

export const page = mongoose.model('Page', Page.pageSchema);


//Game.TeamModel = Game.belongsTo(TeamModel,  {foreignKey: 'team', onUpdate: 'cascade'});
