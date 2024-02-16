'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MediaRoyalties', 'licenseUrl', Sequelize.STRING);
    await queryInterface.addColumn('MediaRoyalties', 'licenseType', Sequelize.STRING);
    await queryInterface.addColumn('MediaRoyalties', 'licenseVersion', Sequelize.STRING);
    await queryInterface.addColumn('MediaRoyalties', 'yearFrom', Sequelize.STRING);
    await queryInterface.addColumn('MediaRoyalties', 'yearTo', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MediaRoyalties', 'licenseUrl');
    await queryInterface.removeColumn('MediaRoyalties', 'licenseType');
    await queryInterface.removeColumn('MediaRoyalties', 'licenseVersion');
    await queryInterface.removeColumn('MediaRoyalties', 'yearFrom');
    await queryInterface.removeColumn('MediaRoyalties', 'yearTo');
  }
};