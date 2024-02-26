'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CeeCreators', 'cee_creator');

    await queryInterface.renameColumn('cee_creator', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_creator', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('cee_creator', 'ceeId', 'cee_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('cee_creator', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_creator', 'updated_at', 'updatedAt');

    await queryInterface.renameTable('cee_creator', 'CeeCreators');
  }
};