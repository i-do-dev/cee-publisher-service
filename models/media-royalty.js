/* 
ModiaRoyalty model with attributes id, type, amount, currency, licenseShortText, LicenseLongText, and MediaId.
ModiaRoyalty model has a one to one relationship with Media model.
*/
'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../src/utils/database');
const { DataTypes } = require('sequelize');

const MediaRoyalty = sequelize.define('MediaRoyalty', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  type: DataTypes.STRING,
  terms: DataTypes.STRING,
  amount: DataTypes.DECIMAL,
  currency: DataTypes.STRING,
  copyrightNotice: DataTypes.TEXT,
  license: DataTypes.TEXT,
  licenseUrl: DataTypes.STRING, // URL of the license
  licenseType: DataTypes.STRING, // Type of the license (e.g., Creative Commons)
  licenseVersion: DataTypes.STRING, // Version of the license (e.g., 4.0)
  yearFrom: DataTypes.STRING, // Year from which the royalty is applicable
  yearTo: DataTypes.STRING, // Year to which the royalty is applicable
  mediaId: DataTypes.UUID,
}, {
  tableName: 'media_royalty',
  underscored: true,
});

module.exports = MediaRoyalty;