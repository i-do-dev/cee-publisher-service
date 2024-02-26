const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

const Admins = sequelize.define('Admins', {
  id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
  },
  email: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
},
{
  underscored: true,
  tableName: 'admin'
});
module.exports = Admins;