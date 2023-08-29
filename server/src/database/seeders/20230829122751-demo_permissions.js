

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('permissions', [
      { value: 'GUEST' },
      { value: 'EMPLOYEE' },
      { value: 'OWNER' },
      { value: 'COMMUNITY_MANAGER' },
      { value: 'COMMUNITY_OWNER' },
      { value: 'ADMIN' }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};