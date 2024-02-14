'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StoreServices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      host: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      clientId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      publisherClientId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StoreServices');
  },
};