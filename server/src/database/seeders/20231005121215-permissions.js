module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('permissions', [
      { value: 'EDIT_GREENHOUSE' },
      { value: 'EDIT_FIELD' },
      { value: 'EDIT_FIXED_DEVICE' },
      { value: 'EDIT_PORTABLE_DEVICE' },
      { value: 'EDIT_ROLE' },
      { value: 'EDIT_PRODUCT' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};
