const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");


const StoreService = sequelize.define('StoreService', {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        host: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clientId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publisherClientId: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        underscored: true,
        modelName: 'store_service'
    });

module.exports = StoreService;