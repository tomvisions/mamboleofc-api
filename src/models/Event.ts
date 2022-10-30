const {DataTypes, Model, sequelize} = require('../db');

class Event extends Model {}

Event.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
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
    image: {
        type: DataTypes.STRING,
    },

}, {
    modelName: 'Event', sequelize: sequelize, tableName:"event"
})

//Game.TeamModel = Game.belongsTo(TeamModel,  {foreignKey: 'team', onUpdate: 'cascade'});

export {Event};
