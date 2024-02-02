'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here      
      MediaLibrary.belongsTo(models.MediaOwner,{
        as:'MediaOwner',
        foreignKey: 'mediaOwnerId',
        targetKey: 'id',
        references: { model: 'MediaOwner', key: 'id' }
      });
    }
  }
  MediaLibrary.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    mediaOwnerId: DataTypes.STRING,
    encodingFormat: DataTypes.STRING,
    resource: DataTypes.STRING,
    identifierType: DataTypes.STRING,
    identifier: DataTypes.STRING,
    parentId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MediaLibrary',
    freezeTableName: true
  });
  return MediaLibrary;
};