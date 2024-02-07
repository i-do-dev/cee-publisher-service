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
        copyrightNotice: DataTypes.STRING,
        license: DataTypes.STRING,
        mediaId: DataTypes.UUID,
    }, {
        sequelize
    });

    return MediaRoyalty;
};