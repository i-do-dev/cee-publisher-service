// CeeMedia Model Definition and Associations with CeeWorkflow and Media

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const CeeMedia = sequelize.define('CeeMedia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    ceeWorkflowId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    mediaId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
{
    sequelize
});

module.exports = CeeMedia;