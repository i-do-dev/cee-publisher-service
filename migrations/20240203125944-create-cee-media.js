'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CeeMedia', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      ceeWorkflowId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'CeeWorkflow',
          key: 'id',
        },
      },
      mediaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Media',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CeeMedia');
  },
};