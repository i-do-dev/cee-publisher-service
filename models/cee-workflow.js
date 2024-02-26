const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("../src/utils/database");

const CeeWorkflow = sequelize.define('CeeWorkflow', {
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
  ceeMasterId: {
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
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  }
},
{
  underscored: true,
  tableName: 'cee_workflow'
});

module.exports = CeeWorkflow;