const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pin extends Model { }


Pin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        lat: {
            type: DataTypes.DECIMAL(10, 4),
            validate: {
                isDecimal: true
            },
            allowNull: false
        },
        long: {
            type: DataTypes.DECIMAL(10, 4),
            validate: {
                isDecimal: true
            },
            allowNull: false
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pin'
    }
);


module.exports = Pin;