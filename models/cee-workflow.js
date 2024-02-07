const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

module.exports = (sequelize, DataTypes) => {
    class CeeWorkflow extends Model {
      static associate(models) {
        CeeWorkflow.belongsTo(models.Cee, { foreignKey: 'ceeId', targetKey: 'id', references: { model: 'Cee', key: 'id' } });
      }
    }
    
    CeeWorkflow.init({
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
      ceeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      schemaType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schemaVersion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      learningResourceType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      educationalLevel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'draft',
      }
    },
    {
      sequelize
    });
    return CeeWorkflow;
};

