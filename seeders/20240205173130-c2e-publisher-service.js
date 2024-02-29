'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // query service count to check if thers no existing service
    const serviceCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "service";`
    );
    const ok = serviceCount[0][0].count == 0;
    if (ok) {
      return await queryInterface.bulkInsert('service', [{
        id: uuidv4(),
        name: 'Demo Publisher Service',
        description: 'C2E Publisher Service reference implementation',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('service', null, {});
  }
};