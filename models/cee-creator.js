// Make CeeCreator model with id, name and email attributes and associate it with Cee model
const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const CeeCreator = sequelize.define('CeeCreator', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ceeId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
{
    freezeTableName: true,
    underscored: true,
    modelName: 'cee_creator'
});

module.exports = CeeCreator;