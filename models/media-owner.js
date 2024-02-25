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
  sequelize
});

module.exports = MediaOwner;
