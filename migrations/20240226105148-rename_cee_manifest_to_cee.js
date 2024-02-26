'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('cee_manifest', 'cee');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('cee', 'cee_manifest');
  }
};