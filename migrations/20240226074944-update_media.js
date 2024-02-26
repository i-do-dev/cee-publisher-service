'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Media', 'media');

    await queryInterface.renameColumn('media', 'createdAt', 'created_at');
    await queryInterface.renameColumn('media', 'updatedAt', 'updated_at');
    // Add more columns as needed
    // mediaOwnerId, encodingFormat, identifierType, parentId
    await queryInterface.renameColumn('media', 'mediaOwnerId', 'media_owner_id');
    await queryInterface.renameColumn('media', 'encodingFormat', 'encoding_format');
    await queryInterface.renameColumn('media', 'identifierType', 'identifier_type');
    await queryInterface.renameColumn('media', 'parentId', 'parent_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('media', 'created_at', 'createdAt');
    await queryInterface.renameColumn('media', 'updated_at', 'updatedAt');
    // Add more columns as needed
    // media_owner_id, encoding_format, identifier_type, parent_id
    await queryInterface.renameColumn('media', 'media_owner_id', 'mediaOwnerId');
    await queryInterface.renameColumn('media', 'encoding_format', 'encodingFormat');
    await queryInterface.renameColumn('media', 'identifier_type', 'identifierType');
    await queryInterface.renameColumn('media', 'parent_id', 'parentId');
    
    await queryInterface.renameTable('media', 'Media');
  }
};