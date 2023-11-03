'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'fields',
      [
        {
          name: 'Field 1',
          size: 5000,
          measurement_id: 3,
          description: 'This is the main field for crop cultivation.',
          location: '1234 Farm Road, Ruralville',
        },
        {
          name: 'Orchard',
          size: 2,
          measurement_id: 5,
          description: 'An apple orchard with various apple tree varieties.',
          location: '567 Orchard Lane, Fruitland',
        },
        {
          name: 'Pasture',
          size: 10,
          measurement_id: 5,
          description: 'A grazing pasture for cattle and sheep.',
          location: '789 Grazing Road, Pastureville',
        },
        {
          name: 'Wheat Field',
          size: 8000,
          measurement_id: 3,
          description: 'A field dedicated to growing wheat crops.',
          location: '456 Wheat Lane, Wheatvill',
        },
        {
          name: 'Vineyard',
          size: 3,
          measurement_id: 5,
          description:
            'A vineyard with various grape varieties for winemaking.',
          location: '789 Vineyard Road, Vinetown',
        },
        {
          name: 'Corn Field',
          size: 6000,
          measurement_id: 3,
          description: 'A field dedicated to growing corn crops.',
          location: '101 Corn Lane, Cornville',
        },
        {
          name: 'Rice Paddy',
          size: 4,
          measurement_id: 5,
          description: 'A flooded field used for rice cultivation.',
          location: '234 Rice Road, Ricetown',
        },
        {
          name: 'Sunflower Field',
          size: 7000,
          measurement_id: 3,
          description: 'A field with beautiful sunflowers for oil production.',
          location: '567 Sunflower Lane, Sunflowerville',
        },
        {
          name: 'Potato Field',
          size: 5500,
          measurement_id: 3,
          description: 'A field for growing various types of potatoes.',
          location: '890 Potato Road, Potatoville',
        },
        {
          name: 'Cotton Field',
          size: 9000,
          measurement_id: 3,
          description:
            'A field for cotton cultivation used in textile production.',
          location: '123 Cotton Lane, Cottonville',
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fields', null, {});
  },
};
