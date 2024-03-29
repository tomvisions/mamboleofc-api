import Mongoose, {Connection, Model, Schema} from 'mongoose';
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
     *
     *
     */
      public async initialize() {
       const conn = this._mongoose.createConnection(this._databaseName, options);

        return conn;
       //await conn.readyState


  //      console.log('testing');
    //    console.log(conn);
    //  const db = this._mongoose.connection;

//      conn.on("error", console.error.bind(console, "MongoDB connection error:"));

  //    return  conn;
 //     console.log(test);
      //  return test;

//        const db = this._mongoose.connection;
  //      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      //  console.log(this._databaseName);
      //  console.log(db);
    //   return db;
//        return new Mongoose(this._database, this._username, this._password, this._options);
    };
}

let options;
if (process.env.NODE_ENV === 'dev') {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
} else if ( process.env.NODE_ENV === 'stage') {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
} else {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
}
console.log('process.env');

console.log(process.env);
const MONGO_DATABASE = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@tomvisions-serverless-i.wdrkx.mongodb.net/mamboleofc-staging`
console.log(MONGO_DATABASE);
const MONGO_DATABASE_LIVE = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@tomvisions-serverless-i.wdrkx.mongodb.net/${process.env.MONGO_DB_NAME_PRODUCTION}`
console.log(MONGO_DATABASE_LIVE);

const mongoose = Mongoose.createConnection(MONGO_DATABASE, options);
const mongooseLive = Mongoose.createConnection(MONGO_DATABASE_LIVE, options);


//console.log(mongoose);
export {mongoose, mongooseLive, Model, Schema};
