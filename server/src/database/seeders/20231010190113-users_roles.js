module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users_roles',
      [
        { user_id: 1, role_id: 4 },
        { user_id: 2, role_id: 4 },
        { user_id: 3, role_id: 3 },
        { user_id: 4, role_id: 3 },
        { user_id: 5, role_id: 6 },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users_roles', null, {});
  },
};
