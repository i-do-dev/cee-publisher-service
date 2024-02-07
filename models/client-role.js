'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class ClientRole extends Model {
        static associate(models) {
            ClientRole.hasOne(models.ApiKey, {
                foreignKey: 'clientRoleId',
                sourceKey: 'id',
                references: { model: 'ApiKey', key: 'id' }
            });
        }
    }

    ClientRole.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize
    });
    return ClientRole;
}