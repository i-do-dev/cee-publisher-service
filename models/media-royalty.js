/* 
ModiaRoyalty model with attributes id, type, amount, currency, licenseShortText, LicenseLongText, and MediaId.
ModiaRoyalty model has a one to one relationship with Media model.
*/
'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class MediaRoyalty extends Model {
    static associate(models) {
      MediaRoyalty.belongsTo(models.Media, {
        foreignKey: 'mediaId',
        targetKey: 'id',
        references: { model: 'Media', key: 'id' }
      });
    }
  }

    MediaRoyalty.init({
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
        sequelize
    });

    return MediaRoyalty;
};