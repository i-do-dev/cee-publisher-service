/* 
ModiaRoyalty model with attributes id, type, amount, currency, licenseShortText, LicenseLongText, and MediaId.
ModiaRoyalty model has a one to one relationship with Media model.
*/
'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaRoyalty extends Model {
    static associate(models) {
      MediaRoyalty.belongsTo(models.Media, {
        as: 'Media',
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
        amount: DataTypes.DECIMAL,
        currency: DataTypes.STRING,
        licenseShortText: DataTypes.STRING,
        licenseLongText: DataTypes.STRING,
        mediaId: DataTypes.UUID,
    }, {
        sequelize,
        modelName: 'MediaRoyalty',
        freezeTableName: true
    });

    return MediaRoyalty;
};