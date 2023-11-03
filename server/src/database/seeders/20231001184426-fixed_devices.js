'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'fixed_devices',
      [
        {
          name: 'Weather Station',
          type: 'Climate Monitoring',
        },
        {
          name: 'Irrigation System',
          type: 'Irrigation Control',
        },
        {
          name: 'Crop Camera',
          type: 'Crop Imaging',
        },
        {
          name: 'Tractor',
          type: 'Farm Equipment',
        },
        {
          name: 'Barn',
          type: 'Storage',
        },
        {
          name: 'Silos',
          type: 'Grain Storage',
        },
        {
          name: 'Windmill',
          type: 'Energy Generation',
        },
        {
          name: 'Field Camera',
          type: 'Field Surveillance',
        },
        {
          name: 'Seeder',
          type: 'Planting',
        },
        {
          name: 'Feed Mixer',
          type: 'Animal Feeding',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fixed_devices', null, {});
  },
};
