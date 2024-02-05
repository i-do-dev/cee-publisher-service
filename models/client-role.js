'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientRole extends Model {
        static associate(models) {
            ClientRole.hasOne(models.ApiKey, {
                as: 'ApiKey',
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
        sequelize,
        freezeTableName: true,
        modelName: 'ClientRole',
    });
    return ClientRole;
}