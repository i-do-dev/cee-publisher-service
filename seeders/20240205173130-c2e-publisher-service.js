'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // query Service count to check if thers no existing Service
    const serviceCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "Service";`
    );
    const ok = serviceCount[0][0].count == 0;
    if (ok) {
      return await queryInterface.bulkInsert('Service', [{
        id: uuidv4(),
        name: 'Demo Publisher Service',
        description: 'C2E Publisher Service reference implementation',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Service', null, {});
  }
};