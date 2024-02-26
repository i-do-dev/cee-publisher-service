const { DataTypes } = require('sequelize');
const { sequelize } = require('../src/utils/database');

const ResetPasswordTokens = sequelize.define('ResetPasswordTokens', {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  tableName: 'reset_password_token',
});

module.exports = ResetPasswordTokens;