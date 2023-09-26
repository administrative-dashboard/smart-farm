/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'measurement_units',
      [
        { value: 'gram', type: 'mass' },
        { value: 'kilogram', type: 'mass' },
        { value: 'square meters', type: 'area' },
        { value: 'square kilometres', type: 'area' },
        { value: 'hectares', type: 'area' },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('measurement_units', null, {});
  },
};
