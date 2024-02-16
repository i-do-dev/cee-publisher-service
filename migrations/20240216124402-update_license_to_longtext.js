'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('MediaRoyalties', 'copyrightNotice', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('MediaRoyalties', 'license', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('MediaRoyalties', 'copyrightNotice', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('MediaRoyalties', 'license', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};