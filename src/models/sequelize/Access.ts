const { DataTypes, sequelize, Model} = require('../../db');

class Access extends Model {}

Access.init({
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    level: {
        type: DataTypes.NUMBER,
    },
    slug: {
        type: DataTypes.STRING,
    },
    createdAt:{
        type: DataTypes.DATE,
    },
    updatedAt:{
        type: DataTypes.DATE,
    },


}, {
    modelName: 'Access', sequelize, tableName:"access"
})

export {Access}
