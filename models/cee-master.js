const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const CeeMaster = sequelize.define('CeeMaster', {
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
    },
    ceeCreatorId: {
        type: DataTypes.UUID,
        allowNull: true,
    }
},
{    
    underscored: true,
    tableName: 'cee_master'
});

module.exports = CeeMaster;
