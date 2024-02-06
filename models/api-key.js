'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class ApiKey extends Model {
        static associate(models) {
            ApiKey.belongsTo(models.ClientRole, {
                as: 'ClientRole',
                foreignKey: 'clientRoleId',
                targetKey: 'id',
                references: { model: 'ClientRole', key: 'id' }
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
            defaultValue: () => uuidv4(),
            allowNull: false,
            unique: true,
        },
        clientRoleId: {
            type: DataTypes.UUID,
            allowNull: false
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'ApiKey'
    });
    return ApiKey;
};