module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'roles',
      [
        { value: 'GUEST' },
        { value: 'EMPLOYEE' },
        { value: 'OWNER' },
        { value: 'COMMUNITY_MANAGER' },
        { value: 'COMMUNITY_OWNER' },
        { value: 'ADMIN' },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
