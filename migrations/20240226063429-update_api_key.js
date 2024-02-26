'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('ApiKeys', 'api_key');

    await queryInterface.renameColumn('api_key', 'createdAt', 'created_at');
    await queryInterface.renameColumn('api_key', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('api_key', 'clientId', 'client_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('api_key', 'created_at', 'createdAt');
    await queryInterface.renameColumn('api_key', 'updated_at', 'updatedAt');

    await queryInterface.renameTable('api_key', 'ApiKeys');
  }
};