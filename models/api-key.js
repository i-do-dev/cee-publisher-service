'use strict';
const {
  Model
} = require('sequelize');
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
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
            clientRoleId: {
            type: DataTypes.UUID
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ApiKey',
    });
    return ApiKey;
};