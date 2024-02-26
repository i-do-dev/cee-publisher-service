'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('admins', 'admin');

    await queryInterface.renameColumn('admin', 'createdAt', 'created_at');
    await queryInterface.renameColumn('admin', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('admin', 'created_at', 'createdAt');
    await queryInterface.renameColumn('admin', 'updated_at', 'updatedAt');

    await queryInterface.renameTable('admin', 'Admins');
  }
};