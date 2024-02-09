'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { generateKey } = require('../src/utils/key');

module.exports = (sequelize, DataTypes) => {
    class ApiKey extends Model {
        static associate(models) {
            // ApiKey belongs to Client
            ApiKey.belongsTo(models.Client, {
                foreignKey: 'clientId',
                targetKey: 'id',
                references: { model: 'Client', key: 'id' }
            });
        }
    }

    ApiKey.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            allowNull: false,
            primaryKey: true,
        },
        key: {
            type: DataTypes.TEXT,
            defaultValue: () => generateKey(),
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize
    });
    return ApiKey;
};