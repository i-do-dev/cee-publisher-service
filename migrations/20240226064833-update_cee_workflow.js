'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CeeWorkflows', 'cee_workflow');

    await queryInterface.renameColumn('cee_workflow', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_workflow', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('cee_workflow', 'ceeId', 'cee_id');
    // schemaType
    await queryInterface.renameColumn('cee_workflow', 'schemaType', 'schema_type');
    // schemaVersion
    await queryInterface.renameColumn('cee_workflow', 'schemaVersion', 'schema_version');
    // learningResourceType
    await queryInterface.renameColumn('cee_workflow', 'learningResourceType', 'learning_resource_type');
    // educationalLevel
    await queryInterface.renameColumn('cee_workflow', 'educationalLevel', 'educational_level');
    // thumbnailUrl
    await queryInterface.renameColumn('cee_workflow', 'thumbnailUrl', 'thumbnail_url');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('cee_workflow', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_workflow', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('cee_workflow', 'cee_id', 'ceeId');
    // schema_type
    await queryInterface.renameColumn('cee_workflow', 'schema_type', 'schemaType');
    // schema_version
    await queryInterface.renameColumn('cee_workflow', 'schema_version', 'schemaVersion');
    // learning_resource_type
    await queryInterface.renameColumn('cee_workflow', 'learning_resource_type', 'learningResourceType');
    // educational_level
    await queryInterface.renameColumn('cee_workflow', 'educational_level', 'educationalLevel');
    // thumbnail_url
    await queryInterface.renameColumn('cee_workflow', 'thumbnail_url', 'thumbnailUrl');

    await queryInterface.renameTable('cee_workflow', 'CeeWorkflows');
  }
};