'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CeeTokens', 'cee_token');

    await queryInterface.renameColumn('cee_token', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_token', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('cee_token', 'ceeId', 'cee_id');
    // expiresAt
    await queryInterface.renameColumn('cee_token', 'expiresAt', 'expires_at');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('cee_token', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_token', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('cee_token', 'cee_id', 'ceeId');
    // expires_at
    await queryInterface.renameColumn('cee_token', 'expires_at', 'expiresAt');

    await queryInterface.renameTable('cee_token', 'CeeTokens');
  }
};