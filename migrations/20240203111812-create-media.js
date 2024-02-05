'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      type: Sequelize.STRING,
      mediaOwnerId: Sequelize.STRING,
      encodingFormat: Sequelize.STRING,
      resource: Sequelize.STRING,
      identifierType: Sequelize.STRING,
      identifier: Sequelize.STRING,
      parentId: {
        type: Sequelize.UUID,
        references: {
          model: 'Media',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Media');
  }
};