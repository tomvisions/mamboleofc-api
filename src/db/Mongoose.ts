import Mongoose, {Model, Schema } from 'mongoose';
import  {Sequelize, Dialect} from '.';
import dotenv from "dotenv";
dotenv.config();

export interface OptionsMongoose {
    useNewUrlParser:boolean;
    useUnifiedTopology: boolean;
    port:number;
}

/**
 * SequelizeApi class. A class that deals with working with Sequelize
 */
export class MongooseApi {
    private _databaseName: string;
    private _options: OptionsMongoose;
    private _mongoose: typeof Mongoose;
    private _database
    /**
     * Constructor for class
     * @param database
     * @param options
     */
    constructor(database: string, options: OptionsMongoose) {
        this._databaseName = database;
        this._options = options;
        this._mongoose = Mongoose;


    }

    /**
     * Initialization function for sequelize
     */
    public initialize() {
        this._mongoose.connect(this._databaseName, options, data => {

            return data;
        });
        const db = this._mongoose.connection;
        db.on("error", console.error.bind(console, "MongoDB connection error:"));

        return db;
//        return new Mongoose(this._database, this._username, this._password, this._options);
    };
}

let options;
if (process.env.NODE_ENV === 'dev') {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
} else if ( process.env.NODE_ENV === 'stage') {
    options = {host: process.env.DB_HOST, dialect: 'mysql', port:33306}
} else {
    options = {host: process.env.DB_HOST, dialect: 'mysql', port:33306}
}

let mongooseClass = new MongooseApi(process.env.MONGO_DATABASE,  options );//.initialize();
let mongoose = mongooseClass.initialize();

export {mongoose, Model, Schema};
