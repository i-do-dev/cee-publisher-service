'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('resetPasswordTokens', 'reset_password_token');

    await queryInterface.renameColumn('reset_password_token', 'createdAt', 'created_at');
    await queryInterface.renameColumn('reset_password_token', 'updatedAt', 'updated_at');
    // Add more columns as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('reset_password_token', 'created_at', 'createdAt');
    await queryInterface.renameColumn('reset_password_token', 'updated_at', 'updatedAt');
    // Add more columns as needed

    await queryInterface.renameTable('reset_password_token', 'resetPasswordTokens');
  }
};