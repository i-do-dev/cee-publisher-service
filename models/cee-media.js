// CeeMedia Model Definition and Associations with CeeWorkflow and Media

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

module.exports = (sequelize, DataTypes) => {
    class CeeMedia extends Model {
        static associate(models) {
            CeeMedia.belongsTo(models.CeeWorkflow, { foreignKey: 'ceeWorkflowId', targetKey: 'id', references: { model: 'CeeWorkflow', key: 'id' } });
            CeeMedia.belongsTo(models.Media, { foreignKey: 'mediaId', targetKey: 'id', references: { model: 'Media', key: 'id' } });
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
        sequelize
    });
    return CeeMedia;
};