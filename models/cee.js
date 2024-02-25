const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const Cee = sequelize.define('Cee', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
{    
    freezeTableName: true,
    underscored: true,
    modelName: 'cee'
});

module.exports = Cee;
