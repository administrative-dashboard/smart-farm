'use strict';


const { faker } = require('@faker-js/faker');
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const ownersFixedDevicesData = [];
    const existingDevices = new Set();

    for (let i = 1; i <= 20; i++) {
      let user_id, fixed_device_id;
      do {
        user_id = faker.number.int({ min: 1, max: 3 });
        fixed_device_id = faker.number.int({ min: 1, max: 10 });
      } while (existingDevices.has(`${user_id}-${fixed_device_id}`));

      existingDevices.add(`${user_id}-${fixed_device_id}`);

      ownersFixedDevicesData.push({
        user_id: user_id,
        fixed_device_id: fixed_device_id,
        quantity: faker.number.int({ min: 1, max: 7 }),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }
    await queryInterface.bulkInsert('owners_fixed_devices', ownersFixedDevicesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('fixed_devices', null, {});
  },
};
