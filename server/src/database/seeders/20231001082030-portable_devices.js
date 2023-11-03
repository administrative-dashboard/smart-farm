'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'portable_devices',
      [
        {
          name: 'Wrench',
          type: 'Adjustable Wrench',
        },
        {
          name: 'Screwdriver',
          type: 'Phillips Screwdriver',
        },
        {
          name: 'Hammer',
          type: 'Claw Hammer',
        },
        {
          name: 'Pliers',
          type: 'Needle-Nose Pliers',
        },
        {
          name: 'Saw',
          type: 'Hand Saw',
        },
        {
          name: 'Wrench',
          type: 'Pipe Wrench',
        },
        {
          name: 'Screwdriver',
          type: 'Flathead Screwdriver',
        },
        {
          name: 'Tape Measure',
          type: 'Retractable Tape Measure',
        },
        {
          name: 'Pliers',
          type: 'Slip Joint Pliers',
        },
        {
          name: 'Utility Knife',
          type: 'Retractable Utility Knife',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('portable_devices', null, {});
  },
};
