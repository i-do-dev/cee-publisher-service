'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole";`
    );

    // query ClientRole where name = 'cee-publisher-tool'
    // query ClientRole where name = 'cee-store'
    // insert into ApiKey
    const ceePublisherToolRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole" WHERE name = 'cee-publisher-tool';`
    );
    const ceePlayerRole = await queryInterface.sequelize.query(
      `SELECT id FROM "ClientRole" WHERE name = 'cee-store';`
    );

    return queryInterface.bulkInsert('ApiKey', [{
      id: uuidv4(),
      key: uuidv4(),
      clientRoleId: ceePublisherToolRole[0][0].id
    }, {
      id: uuidv4(),
      key: uuidv4(),
      clientRoleId: ceePlayerRole[0][0].id
    }], {});

    /*
    return queryInterface.bulkInsert('ApiKey', [{
      id: uuidv4(),
      key: uuidv4(),
      clientRoleId: roles[0][0].id
    }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ApiKey', null, {});
  }
};