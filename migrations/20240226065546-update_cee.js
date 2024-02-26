'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Cees', 'cee');

    await queryInterface.renameColumn('cee', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee', 'updatedAt', 'updated_at');
    // Add more columns as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('cee', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee', 'updated_at', 'updatedAt');
    // Add more columns as needed

    await queryInterface.renameTable('cee', 'Cees');
  }
};