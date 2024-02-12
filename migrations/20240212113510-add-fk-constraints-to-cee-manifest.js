'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('CeeManifests', {
      fields: ['ceeId'],
      type: 'foreign key',
      name: 'fk_ceeId',
      references: {
        table: 'Cees',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('CeeManifests', {
      fields: ['storeId'],
      type: 'foreign key',
      name: 'fk_storeId',
      references: {
        table: 'StoreServices',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CeeManifests', 'fk_ceeId');
    await queryInterface.removeConstraint('CeeManifests', 'fk_storeId');
  }
};