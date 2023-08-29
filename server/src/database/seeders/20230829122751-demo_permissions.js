

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('permissions', [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};