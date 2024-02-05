'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Service', [{
      id: uuidv4(),
      name: 'C2E Publisher Service',
      description: 'C2E Publisher Service reference implementation',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Service', null, {});
  }
};