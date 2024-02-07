'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('CeeWorkflows', {
      fields: ['ceeId'],
      type: 'foreign key',
      name: 'CeeWorkflow_ceeId_fkey',
      references: {
        table: 'Cees',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CeeWorkflows', 'CeeWorkflow_ceeId_fkey');
  }
};