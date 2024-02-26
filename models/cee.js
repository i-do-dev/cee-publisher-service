// require uuidv4
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../src/utils/database');

const Cee = sequelize.define('Cee', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    ceeMasterId: {
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
    underscored: true,
    tableName: 'cee'
});

module.exports = Cee;