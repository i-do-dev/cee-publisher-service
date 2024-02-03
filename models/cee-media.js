// CeeMedia Model Definition and Associations with CeeWorkflow and Media

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../database');

module.exports = (sequelize, DataTypes) => {
    class CeeMedia extends Model {
        static associate(models) {
            CeeMedia.belongsTo(models.CeeWorkflow, { as: 'CeeWorkflow', foreignKey: 'ceeWorkflowId', targetKey: 'id', references: { model: 'CeeWorkflow', key: 'id' } });
            CeeMedia.belongsTo(models.Media, { as: 'Media', foreignKey: 'mediaId', targetKey: 'id', references: { model: 'Media', key: 'id' } });
        }
    }
    
    CeeMedia.init({
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
        sequelize,
        modelName: 'CeeMedia',
        freezeTableName: true,
    });
};