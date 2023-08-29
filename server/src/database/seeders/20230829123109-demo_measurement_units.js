/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
      await queryInterface.bulkInsert('measurement_units', [
        { value: 'grams' },
        { value: 'kilograms' },
        { value: 'milligrams' },
        { value: 'liters' },
        { value: 'milliliters' },
        { value: 'cubic meters' },
        { value: 'cubic centimeters' },
        { value: 'cups' },
        { value: 'tablespoons' },
        { value: 'teaspoons' },
        { value: 'fluid ounces' },
        { value: 'pints' },
        { value: 'quarts' },
        { value: 'gallons' },
        { value: 'pieces' },
        { value: 'packs' },
        { value: 'boxes' },
        { value: 'dozens' },
        { value: 'meters' },
        { value: 'centimeters' },
        { value: 'millimeters' },
        { value: 'inches' },
        { value: 'feet' },
        { value: 'yards' },
        // Add more measurement units here
      ], {});
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('measurement_units', null, {});
    }
  };
  