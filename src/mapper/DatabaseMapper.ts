/* const Sequelize =  require("sequelize");

export class DatabaseMapper {
    private sequelize;

    async __construct() {
        this.sequelize = new Sequelize('tomvisions', 'root', 'linuxstyle',{
            //  host: 'tomvisions-test.c96mrnuser6y.us-east-1.rds.amazonaws.com',
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306,
        });

        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async __deconstruct() {
        this.sequelize.close();
    }
*/