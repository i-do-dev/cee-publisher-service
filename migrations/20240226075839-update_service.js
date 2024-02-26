'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Service', 'service');

    await queryInterface.renameColumn('service', 'createdAt', 'created_at');
    await queryInterface.renameColumn('service', 'updatedAt', 'updated_at');
    // Add more columns as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('service', 'created_at', 'createdAt');
    await queryInterface.renameColumn('service', 'updated_at', 'updatedAt');
    // Add more columns as needed

    await queryInterface.renameTable('service', 'Service');
  }
};