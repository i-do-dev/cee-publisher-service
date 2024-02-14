'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CeeWorkflows', {
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
      description: {
        type: Sequelize.STRING,
      },
      ceeId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      schemaType: Sequelize.STRING,
      schemaVersion: Sequelize.STRING,
      learningResourceType: Sequelize.STRING,
      educationalLevel: Sequelize.STRING,
      subject: Sequelize.STRING,
      keywords: Sequelize.STRING,
      thumbnailUrl: Sequelize.STRING,
      url: Sequelize.STRING,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CeeWorkflows');
  }
};
