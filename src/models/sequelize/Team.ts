import {Model, DataTypes, sequelize} from '../../db';

//import {GameModel} from "./Game";

class Team extends Model {}

Team.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Team', sequelize: sequelize, tableName:"team"
})
//console.log(modelInit);

//Team.GameModel = GameModel.hasOne(Team, {as: 'team', foreignKey: 'team', onUpdate: 'cascade'});
//Team.GameModel = Team.hasOne(GameModel, {as: 'team', foreignKey: 'team', onUpdate: 'cascade'});

export { Team };
