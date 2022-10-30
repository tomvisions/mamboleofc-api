const {Sequelize, DataTypes, Model} = require("sequelize");

//const {Sequelize} =  require("sequelize");

/**
 *
 */
export class Database extends Model {
    private _sequelizeMysql: any;
    private _dataTypes;

    initializeDataTypes() {
        this.dataTypes = DataTypes;
    }


    static initializeSequelize() {
        console.log('wooo');
  /*      this.sequelizeMysql = new Sequelize('tomvisions', 'root', 'linuxstyle', {
            //  host: 'tomvisions-test.c96mrnuser6y.us-east-1.rds.amazonaws.com',
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306,
            logging: console.log
        }); */
              this.sequelizeMysql = new Sequelize('simpleplau', 'tcruickshank', 'net123DBMaster', {
                    host: 'tomvisions-test.c96mrnuser6y.us-east-1.rds.amazonaws.com',
                //  host: '127.0.0.1',
                  dialect: 'mysql',
                  port: 33306,
                  logging: console.log
              }); 
        try {
            //    await this._sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    static initSetup(object, options) {
        console.log('init setup');
        this.initializeSequelize();

        options.sequelize = this.sequelizeMysql;
        console.log('the object');
        console.log(object);
        console.log('options');
        console.log(options);
        return this.init(object, options);
    }

    static init(object, options) {
       return super.init(object, options);

    }

    get sequelizeMysql(): any {
        return this._sequelizeMysql;
    }

    set sequelizeMysql(value: any) {
        this._sequelizeMysql = value;
    }

    get dataTypes() {
        return this._dataTypes;
    }

    set dataTypes(value) {
        this._dataTypes = value;
    }
}
