'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CeeWorkflow', {
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
      status: {
        type: Sequelize.STRING,
        defaultValue: 'draft',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CeeWorkflow');
  }
};
