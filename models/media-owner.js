'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../src/utils/database');

const MediaOwner = sequelize.define('MediaOwner', {
  id: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  underscored: true,
  tableName: 'media_owner'
});

module.exports = MediaOwner;
