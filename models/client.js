// Client model with id and email fields
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../src/utils/database');

const Client = sequelize.define('Client', {
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
    underscored: true,
    tableName: 'client'
});

module.exports = Client;
