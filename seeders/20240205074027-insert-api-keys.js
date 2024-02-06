'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // query ClientRole where name = 'cee-publisher-tool'
    // query ClientRole where name = 'cee-store'
    // insert into ApiKey
    const ceePublisherToolRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole" WHERE name = 'cee-publisher-tool';`
    );
    const ceeStoreRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole" WHERE name = 'cee-store';`
    );
    
    // query ApiKey count to check if thers no existing ApiKey
    const apiKeyCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "ApiKey";`
    );
    
    const ok = ceePublisherToolRole[0][0] && ceeStoreRole[0][0] && apiKeyCount[0][0].count == 0;
    if (ok) {
      return await queryInterface.bulkInsert('ApiKey', [{
        id: uuidv4(),
        key: uuidv4(),
        clientRoleId: ceePublisherToolRole[0][0].id
      }, {
        id: uuidv4(),
        key: uuidv4(),
        clientRoleId: ceeStoreRole[0][0].id
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ApiKey', null, {});
  }
};