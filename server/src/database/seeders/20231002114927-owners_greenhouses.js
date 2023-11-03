'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ownersGreenhousesData = [];
    const existingGreenhouses = new Set();
    for (let i = 1; i <= 10; i++) {
      let user_id, greenhouse_id;
      do {
        user_id = faker.number.int({ min: 1, max: 3 });
        greenhouse_id = faker.number.int({ min: 1, max: 10 });
      } while (existingGreenhouses.has(greenhouse_id));
      existingGreenhouses.add(greenhouse_id);
      ownersGreenhousesData.push({
        user_id: user_id,
        greenhouse_id: greenhouse_id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert(
      'owners_greenhouses',
      ownersGreenhousesData,
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('owners_greenhouses', null, {});
  },
};
