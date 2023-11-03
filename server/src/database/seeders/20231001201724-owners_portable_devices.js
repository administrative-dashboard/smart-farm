'use strict';

const { faker } = require('@faker-js/faker');
module.exports = {
  async up(queryInterface, Sequelize) {
    const ownersPortableDevicesData = [];
    const existingDevices = new Set();

    for (let i = 1; i <= 20; i++) {
      const isShared = faker.datatype.boolean();
      const sharedQuantity = isShared
        ? faker.number.int({ min: 1, max: 5 })
        : 0;

      let user_id, portable_device_id;
      do {
        user_id = faker.number.int({ min: 1, max: 3 });
        portable_device_id = faker.number.int({ min: 1, max: 10 });
      } while (existingDevices.has(`${user_id}-${portable_device_id}`));

      existingDevices.add(`${user_id}-${portable_device_id}`);

      ownersPortableDevicesData.push({
        user_id: user_id,
        portable_device_id: portable_device_id,
        quantity: faker.number.int({ min: 1, max: 7 }),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        is_shared: isShared,
        shared_quantity: sharedQuantity,
      });
    }
    await queryInterface.bulkInsert(
      'owners_portable_devices',
      ownersPortableDevicesData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('owners_portable_devices', null, {});
  },
};
