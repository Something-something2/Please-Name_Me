const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');


class Hole extends Model {}

Hole.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.INTEGER,
        
    },
    par: {
        type: DataTypes.INTEGER
    },
    yards: {
        type: DataTypes.INTEGER   
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'hole'
});

module.exports = Hole;