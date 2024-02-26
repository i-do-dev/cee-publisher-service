'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('cee', 'cee_master');
    await queryInterface.addColumn('cee_master', 'cee_creator_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'cee_creator', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cee_master', 'cee_creator_id');
    await queryInterface.renameTable('cee_master', 'cee');
  }
};