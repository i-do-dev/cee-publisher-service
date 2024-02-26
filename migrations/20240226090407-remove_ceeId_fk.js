'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('cee_creator', 'CeeCreators_ceeId_fkey');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('cee_creator', {
      fields: ['ceeId'],
      type: 'foreign key',
      name: 'CeeCreators_ceeId_fkey',
      references: { //Required field
        table: 'cee',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};