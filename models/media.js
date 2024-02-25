'use strict';
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../src/utils/database');

const Media = sequelize.define('Media', {
  id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  type: DataTypes.STRING,
  mediaOwnerId: DataTypes.STRING,
  encodingFormat: DataTypes.STRING,
  resource: DataTypes.STRING,
  identifierType: DataTypes.STRING,
  identifier: DataTypes.STRING,
  parentId: DataTypes.STRING,
}, {
  sequelize
});

module.exports =  Media;