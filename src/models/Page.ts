import {Schema} from "mongoose";
import {mongoose, mongooseLive} from "../db/Mongoose";

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
        title: {
            type:  Schema.Types.String,
        },
        content: {
            type:  Schema.Types.Array,
        },
        slug: {
            type:  Schema.Types.String,
        },
        identifier: {
            type: Schema.Types.String,
        },
    })
}
export const page = mongoose.model('Page', Page.pageSchema);
export const pageLive = mongooseLive.model('Page', Page.pageSchema);

//console.log(mongooseLive);
//Game.TeamModel = Game.belongsTo(TeamModel,  {foreignKey: 'team', onUpdate: 'cascade'});
