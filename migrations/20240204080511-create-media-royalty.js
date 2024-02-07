'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MediaRoyalties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      type: Sequelize.STRING,
      terms: Sequelize.STRING,
      amount: Sequelize.DECIMAL,
      currency: Sequelize.STRING,
      copyrightNotice: Sequelize.STRING,
      license: Sequelize.STRING,
      mediaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Media',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MediaRoyalties');
  }
};