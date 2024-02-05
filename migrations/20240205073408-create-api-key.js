'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ApiKey', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        unique: true,
      },
      clientRoleId: {
        type: Sequelize.UUID,
        references: {
          model: 'ClientRole',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ApiKey');
  }
};