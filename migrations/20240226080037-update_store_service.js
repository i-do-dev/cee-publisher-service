'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('StoreServices', 'store_service');

    await queryInterface.renameColumn('store_service', 'createdAt', 'created_at');
    await queryInterface.renameColumn('store_service', 'updatedAt', 'updated_at');
    // Add more columns as needed
    // clientId, publisherClientId
    await queryInterface.renameColumn('store_service', 'clientId', 'client_id');
    await queryInterface.renameColumn('store_service', 'publisherClientId', 'publisher_client_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('store_service', 'created_at', 'createdAt');
    await queryInterface.renameColumn('store_service', 'updated_at', 'updatedAt');
    // Add more columns as needed
    // client_id, publisher_client_id
    await queryInterface.renameColumn('store_service', 'client_id', 'clientId');
    await queryInterface.renameColumn('store_service', 'publisher_client_id', 'publisherClientId');

    await queryInterface.renameTable('store_service', 'StoreServices');
  }
};