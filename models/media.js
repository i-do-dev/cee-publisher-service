'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here      
      Media.belongsTo(models.MediaOwner,{
        foreignKey: 'mediaOwnerId',
        targetKey: 'id',
        references: { model: 'MediaOwner', key: 'id' }
      });

      Media.hasOne(models.MediaRoyalty, {
        foreignKey: 'mediaId',
        targetKey: 'id',
        references: { model: 'MediaRoyalty', key: 'id' }
      });

      Media.hasMany(models.CeeMedia, {
        foreignKey: 'mediaId',
        sourceKey: 'id',
        references: { model: 'CeeMedia', key: 'id' }
      });
    }
  }
  Media.init({
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
  return Media;
};