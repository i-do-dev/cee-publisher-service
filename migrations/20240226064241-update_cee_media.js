'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CeeMedia', 'cee_media');

    await queryInterface.renameColumn('cee_media', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_media', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('cee_media', 'ceeWorkflowId', 'cee_workflow_id');
    await queryInterface.renameColumn('cee_media', 'mediaId', 'media_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('cee_media', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_media', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('cee_media', 'cee_workflow_id', 'ceeWorkflowId');
    await queryInterface.renameColumn('cee_media', 'media_id', 'mediaId');

    await queryInterface.renameTable('cee_media', 'CeeMedias');
  }
};