// require uuidv4
const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../src/utils/database');

const CeeManifest = sequelize.define('CeeManifest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    ceeId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    manifest: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subscriptionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    storeId: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
{
    freezeTableName: true,
    underscored: true,
    modelName: 'cee_creator'
});

module.exports = CeeManifest;