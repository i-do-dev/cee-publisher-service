'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('MediaOwners', 'media_owner');

    await queryInterface.renameColumn('media_owner', 'createdAt', 'created_at');
    await queryInterface.renameColumn('media_owner', 'updatedAt', 'updated_at');
    // Add more columns as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('media_owner', 'created_at', 'createdAt');
    await queryInterface.renameColumn('media_owner', 'updated_at', 'updatedAt');
    // Add more columns as needed

    await queryInterface.renameTable('media_owner', 'MediaOwners');
  }
};