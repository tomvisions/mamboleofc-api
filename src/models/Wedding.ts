"use strict";
import {Database} from "./Database";
//import {DataTypes} from "sequelize";
//const { DataTypes } = require('sequelize');

export class Gallery extends Database {

    const 
    static initSetup() {
        //         Database.prototype.initializeSequelize();
        //   console.log('dd');
        Database.prototype.initializeDataTypes();

        return super.initSetup({
            // Model attributes are defined here
            firstName: {
                type: Database.prototype.dataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: Database.prototype.dataTypes.STRING
                // allowNull defaults to true
            }
        }, {
            modelName: 'Gallery'
        })
    }
}

/*
const gallery = new Gallery();
gallery.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

export gallery;



/*
const galleryObject = new gallery();

galleryObject.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});
/*
Gallery.init({


}
= Schema({

    title:{
        type: String,
        required: true,
    },

    body:{
        type: String,
        required: true,
    },

    article_image: {
        type: String,
        required: false,
    },

    date:{
        type: Date,
        default: Date.now(),
    }

});

module.exports = sequelize.model("Gallery", GallerySchema);
*/