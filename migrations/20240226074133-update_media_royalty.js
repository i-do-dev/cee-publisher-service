'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('MediaRoyalties', 'media_royalty');

    await queryInterface.renameColumn('media_royalty', 'createdAt', 'created_at');
    await queryInterface.renameColumn('media_royalty', 'updatedAt', 'updated_at');
    // Add more columns as needed
    // copyrightNotice
    await queryInterface.renameColumn('media_royalty', 'copyrightNotice', 'copyright_notice');
    // licenseUrl, licenseType, licenseVersion, yearFrom, yearTo and mediaId
    await queryInterface.renameColumn('media_royalty', 'licenseUrl', 'license_url');
    await queryInterface.renameColumn('media_royalty', 'licenseType', 'license_type');
    await queryInterface.renameColumn('media_royalty', 'licenseVersion', 'license_version');
    await queryInterface.renameColumn('media_royalty', 'yearFrom', 'year_from');
    await queryInterface.renameColumn('media_royalty', 'yearTo', 'year_to');
    await queryInterface.renameColumn('media_royalty', 'mediaId', 'media_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('media_royalty', 'created_at', 'createdAt');
    await queryInterface.renameColumn('media_royalty', 'updated_at', 'updatedAt');
    // Add more columns as needed
    // copyright_notice
    await queryInterface.renameColumn('media_royalty', 'copyright_notice', 'copyrightNotice');
    // license_url, license_type, license_version, year_from, year_to and media_id
    await queryInterface.renameColumn('media_royalty', 'license_url', 'licenseUrl');
    await queryInterface.renameColumn('media_royalty', 'license_type', 'licenseType');
    await queryInterface.renameColumn('media_royalty', 'license_version', 'licenseVersion');
    await queryInterface.renameColumn('media_royalty', 'year_from', 'yearFrom');
    await queryInterface.renameColumn('media_royalty', 'year_to', 'yearTo');
    await queryInterface.renameColumn('media_royalty', 'media_id', 'mediaId');

    await queryInterface.renameTable('media_royalty', 'MediaRoyalties');
  }
};