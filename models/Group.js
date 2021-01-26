const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Group extends Model {}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    players: {
        type: DataTypes.INTEGER,
    },
    tee_time: {
        type: DataTypes.TIME
    },
    hole_id: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'group'
});

module.exports = Group;