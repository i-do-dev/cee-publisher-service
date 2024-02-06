'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // query ClientRole where name = 'cee-publisher-tool' and 'cee-store'
    // insert into ClientRole if not exists
    const ceePublisherToolRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole" WHERE name = 'cee-publisher-tool';`
    );
    const ceeStoreRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole" WHERE name = 'cee-store';`
    );
    const ok = ceePublisherToolRole[0][0] && ceeStoreRole[0][0];
    if (!ok) {
      return await queryInterface.bulkInsert('ClientRole', [{
        id: uuidv4(),
        name: 'cee-publisher-tool',
        description: 'Authorizes the C2E Publisher Tool to access the relevant resources'
      }, {
        id: uuidv4(),
        name: 'cee-store',
        description: 'Authorizes the C2E Player to access the relevant resources'
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ClientRole', null, {});
  }
};