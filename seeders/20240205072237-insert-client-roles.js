'use strict';
const { v4: uuidv4 } = require('uuid');
const { generateKey } = require('../src/utils/key');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // query client_role where name = 'cee-publisher-tool' and 'cee-store-service'
    // insert into client_role if not exists
    const ceePublisherToolRole = await queryInterface.sequelize.query(
      `SELECT id FROM "client_role" WHERE name = 'cee-publisher-tool';`
    );
    const ceeStoreRole = await queryInterface.sequelize.query(
      `SELECT id FROM "client_role" WHERE name = 'cee-store-service';`
    );
    const ok = ceePublisherToolRole[0][0] && ceeStoreRole[0][0];
    if (!ok) {
      const publisherToolRoleId = uuidv4();
      const storeRoleId = uuidv4();
      const publisherToolClientId = uuidv4();
      const storeClientId = uuidv4();

      await queryInterface.bulkInsert('client_role', [{
          id: storeRoleId,
          name: 'cee-store-service',
          description: 'Authorizes the C2E store to access the relevant resources'
        }, {
          id: publisherToolRoleId,
          name: 'cee-publisher-tool',
          description: 'Authorizes the C2E publisher tool to access the relevant resources'
        }], {});

      await queryInterface.bulkInsert('client', [{
          id: publisherToolClientId,
          email: 'studio@curriki.org',
          client_role_id: publisherToolRoleId
        }, {
          id: storeClientId,
          email: 'demo-c2e-store@curriki.org',
          client_role_id: storeRoleId
        }], {});

      return queryInterface.bulkInsert('api_key', [{
          id: uuidv4(),
          key: generateKey(),
          client_id: publisherToolClientId
        }, {
          id: uuidv4(),
          key: generateKey(),
          client_id: storeClientId
        }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('client_role', null, {});
  }
};