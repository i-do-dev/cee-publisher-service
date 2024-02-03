'use strict';
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
        as:'MediaOwner',
        foreignKey: 'mediaOwnerId',
        targetKey: 'id',
        references: { model: 'MediaOwner', key: 'id' }
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
    sequelize,
    modelName: 'Media',
    freezeTableName: true
  });
  return Media;
};