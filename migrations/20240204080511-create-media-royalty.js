'use strict';

const { on } = require("nodemailer/lib/xoauth2");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MediaRoyalty', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      type: Sequelize.STRING,
      amount: Sequelize.DECIMAL,
      currency: Sequelize.STRING,
      licenseShortText: Sequelize.STRING,
      licenseLongText: Sequelize.STRING,
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
    await queryInterface.dropTable('MediaRoyalty');
  }
};