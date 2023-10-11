'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('greenhouses', [
      {
        name: 'Greenhouse 1',
        size: 500, 
        measurement_id: 3, 
        description: 'A greenhouse for growing a variety of vegetables and herbs.',
        location: '123 Greenhouse Lane, Greensville',
      },
      {
        name: 'Flower Greenhouse',
        size: 100, 
        measurement_id: 3, 
        description: 'A greenhouse dedicated to cultivating beautiful flowers.',
        location: '567 Flower Lane, Flowerland',
      },
      {
        name: 'Tomato Greenhouse',
        size: 200, 
        measurement_id: 3, 
        description: 'A greenhouse specializing in tomato production.',
        location: '789 Tomato Road, Tomatoville',
      },
      {
        name: 'Orchid Greenhouse',
        size: 50, 
        measurement_id: 3, 
        description: 'A greenhouse filled with exotic orchid plants.',
        location: '456 Orchid Lane, Orchidville',
      },
      {
        name: 'Herb Greenhouse',
        size: 75, 
        measurement_id: 3, 
        description: 'A greenhouse for growing various culinary herbs.',
        location: '101 Herb Road, Herbsville',
      },
      {
        name: 'Fruit Greenhouse',
        size: 300, 
        measurement_id: 3, 
        description: 'A greenhouse for cultivating fruit-bearing plants.',
        location: '234 Fruit Lane, Fruitville',
      },
      {
        name: 'Aquaponics Greenhouse',
        size: 150, 
        measurement_id: 3, 
        description: 'A greenhouse with an aquaponics system for sustainable farming.',
        location: '567 Aquaponics Road, Aquaponicsville',
      },
      {
        name: 'Exotic Plants Greenhouse',
        size: 100, 
        measurement_id: 3, 
        description: 'A greenhouse filled with rare and exotic plant species.',
        location: '890 Exotic Lane, Exoticville',
      },
      {
        name: 'Cactus Greenhouse',
        size: 60, 
        measurement_id: 3, 
        description: 'A greenhouse dedicated to growing various cactus species.',
        location: '123 Cactus Road, Cactusville',
      },
      {
        name: 'Tropical Greenhouse',
        size: 200, 
        measurement_id: 3, 
        description: 'A greenhouse designed for tropical plant cultivation.',
        location: '456 Tropical Lane, Tropicalville',
      },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('greenhouses', null, {});
  }
};