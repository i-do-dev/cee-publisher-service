'use strict';
const { v4: uuidv4 } = require('uuid');
const { generateKey } = require('../src/utils/key');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // query ClientRoles where name = 'cee-publisher-tool' and 'cee-store-service'
    // insert into ClientRoles if not exists
    const ceePublisherToolRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRoles" WHERE name = 'cee-publisher-tool';`
    );
    const ceeStoreRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRoles" WHERE name = 'cee-store-service';`
    );
    const ok = ceePublisherToolRole[0][0] && ceeStoreRole[0][0];
    if (!ok) {
      const publisherToolRoleId = uuidv4();
      const storeRoleId = uuidv4();
      const publisherToolClientId = uuidv4();
      const storeClientId = uuidv4();

      await queryInterface.bulkInsert('ClientRoles', [{
          id: storeRoleId,
          name: 'cee-store-service',
          description: 'Authorizes the C2E store to access the relevant resources'
        }, {
          id: publisherToolRoleId,
          name: 'cee-publisher-tool',
          description: 'Authorizes the C2E publisher tool to access the relevant resources'
        }], {});

      await queryInterface.bulkInsert('Clients', [{
          id: publisherToolClientId,
          email: 'studio@curriki.org',
          clientRoleId: publisherToolRoleId
        }, {
          id: storeClientId,
          email: 'demo-c2e-store@curriki.org',
          clientRoleId: storeRoleId
        }], {});

      return queryInterface.bulkInsert('ApiKeys', [{
          id: uuidv4(),
          key: generateKey(),
          clientId: publisherToolClientId
        }, {
          id: uuidv4(),
          key: generateKey(),
          clientId: storeClientId
        }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ClientRoles', null, {});
  }
};