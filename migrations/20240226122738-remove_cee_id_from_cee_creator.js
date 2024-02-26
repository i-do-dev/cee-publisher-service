'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cee_creator', 'cee_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cee_creator', 'cee_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  }
};