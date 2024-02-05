'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MediaOwner.hasMany(models.Media,{
        as:'Media',
        foreignKey: 'mediaOwnerId',
        sourceKey: 'id',
      });
    }
  }
  MediaOwner.init({
    id: {
        type: DataTypes.TEXT,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    about: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MediaOwner',
    freezeTableName: true
  });

  return MediaOwner;
};