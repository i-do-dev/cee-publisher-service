'use strict';
const { v4: uuidv4 } = require('uuid');
const { Key } = require('../src/utils/key');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
    // query ClientRoles where name = 'cee-publisher-tool'
    // query ClientRoles where name = 'cee-store'
    // insert into ApiKey
    const ceePublisherToolRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRoles" WHERE name = 'cee-publisher-tool';`
    );
    const ceeStoreRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRoles" WHERE name = 'cee-store';`
    );
    
    // query ApiKey count to check if thers no existing ApiKey
    const apiKeyCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "ApiKeys";`
    );
    
    const ok = ceePublisherToolRole[0][0] && ceeStoreRole[0][0] && apiKeyCount[0][0].count == 0;
    if (ok) {
      return await queryInterface.bulkInsert('ApiKeys', [{
        id: uuidv4(),
        key: generateKey(),
        clientRoleId: ceePublisherToolRole[0][0].id
      }, {
        id: uuidv4(),
        key: generateKey(),
        clientRoleId: ceeStoreRole[0][0].id
      }], {});
    }
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('api_key', null, {});
  }
};