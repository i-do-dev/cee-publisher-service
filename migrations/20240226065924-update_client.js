'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Clients', 'client');

    await queryInterface.renameColumn('client', 'createdAt', 'created_at');
    await queryInterface.renameColumn('client', 'updatedAt', 'updated_at');
    // Add more columns as needed
    //clientRoleId
    await queryInterface.renameColumn('client', 'clientRoleId', 'client_role_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('client', 'created_at', 'createdAt');
    await queryInterface.renameColumn('client', 'updated_at', 'updatedAt');
    // Add more columns as needed
    //client_role_id
    await queryInterface.renameColumn('client', 'client_role_id', 'clientRoleId');

    await queryInterface.renameTable('client', 'Clients');
  }
};