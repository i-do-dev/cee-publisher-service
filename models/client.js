// Client model with id and email fields
'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
        static associate(models) {
            Client.belongsTo(models.ClientRole, {
                foreignKey: 'clientRoleId',
                targetKey: 'id',
                references: { model: 'ClientRole', key: 'id' }
            });

            Client.hasMany(models.ApiKey, {
                foreignKey: 'clientId',
                sourceKey: 'id',
                references: { model: 'ApiKey', key: 'id' }
            });
        }
    }

    Client.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize
    });
}
