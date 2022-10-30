"use strict";

const {DataTypes, Model, sequelize} = require('../db');

class Gallery extends Model {}

Gallery.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Gallery', sequelize: sequelize, tableName:"gallery"
});

//Gallery.Image = Image.belongsTo(Image,  {foreignKey: 'gallery', onUpdate: 'cascade'});

export {Gallery}
