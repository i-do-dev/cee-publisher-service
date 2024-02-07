'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Media', {
      fields: ['mediaOwnerId'],
      type: 'foreign key',
      name: 'media_media_owner_id_fk',
      references: {
        table: 'MediaOwners',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Media', 'media_media_owner_id_fk');
  }
};