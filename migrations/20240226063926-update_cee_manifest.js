'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CeeManifests', 'cee_manifest');

    await queryInterface.renameColumn('cee_manifest', 'createdAt', 'created_at');
    await queryInterface.renameColumn('cee_manifest', 'updatedAt', 'updated_at');
    await queryInterface.renameColumn('cee_manifest', 'ceeId', 'cee_id');
    // rename subscriptionId to subscription_id
    await queryInterface.renameColumn('cee_manifest', 'subscriptionId', 'subscription_id');
    // rename storeId
    await queryInterface.renameColumn('cee_manifest', 'storeId', 'store_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('cee_manifest', 'created_at', 'createdAt');
    await queryInterface.renameColumn('cee_manifest', 'updated_at', 'updatedAt');
    await queryInterface.renameColumn('cee_manifest', 'cee_id', 'ceeId');
    // rename subscription_id to subscriptionId
    await queryInterface.renameColumn('cee_manifest', 'subscription_id', 'subscriptionId');
    // rename store_id
    await queryInterface.renameColumn('cee_manifest', 'store_id', 'storeId');

    await queryInterface.renameTable('cee_manifest', 'CeeManifests');
  }
};