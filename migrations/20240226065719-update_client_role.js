'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('ClientRoles', 'client_role');

    await queryInterface.renameColumn('client_role', 'createdAt', 'created_at');
    await queryInterface.renameColumn('client_role', 'updatedAt', 'updated_at');
    // Add more columns as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('client_role', 'created_at', 'createdAt');
    await queryInterface.renameColumn('client_role', 'updated_at', 'updatedAt');
    // Add more columns as needed

    await queryInterface.renameTable('client_role', 'ClientRoles');
  }
};