'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ownersFieldsData = [];
    const existingFields = new Set();
    for (let i = 1; i <= 10; i++) {
      let user_id, field_id;
      do {
        user_id = faker.number.int({ min: 1, max: 3 });
        field_id = faker.number.int({ min: 1, max: 10 });
      } while (existingFields.has(field_id));
      existingFields.add(field_id);
      ownersFieldsData.push({
        user_id: user_id,
        field_id: field_id,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert('owners_fields', ownersFieldsData, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('owners_fields', null, {});
  },
};