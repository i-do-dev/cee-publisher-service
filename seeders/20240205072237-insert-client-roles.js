'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ClientRole', [{
      id: uuidv4(),
      name: 'cee-publisher-tool',
      description: 'Authorizes the C2E Publisher Tool to access the relevant resources'
    }, {
      id: uuidv4(),
      name: 'cee-store',
      description: 'Authorizes the C2E Player to access the relevant resources'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ClientRole', null, {});
  }
};