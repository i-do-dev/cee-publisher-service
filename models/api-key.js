const { v4: uuidv4 } = require('uuid');
const { generateKey } = require('../src/utils/key');
const { sequelize } = require('../src/utils/database');
const { DataTypes } = require('sequelize');

const ApiKey = sequelize.define('ApiKey', {
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
    underscored: true,
    tableName: 'api_key'
});

module.exports = ApiKey;