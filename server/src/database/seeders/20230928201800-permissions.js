
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('permissions', [
      { value: 'VIEW_MAIN_DASHBOARD' },
      { value: 'VIEW_PROFILE_INFO' },
      { value: 'EDIT_PROFILE_INFO' },
      { value: 'ADD_GREENHOUSE' },
      { value: 'DELETE_GREENHOUSE' },
      { value: 'CREATE_FIELD' },
      { value: 'DELETE_FIELD' },
      { value: 'CREATE_FIXED_DEVICE' },
      { value: 'DELETE_FIXED_DEVICE' },
      { value: 'CREATE_PORTABLE_DEVICE' },
      { value: 'DELETE_GREENHOUSE' },
      { value: 'DELETE_PORTABLE_DEVICE' },
      { value: 'VIEW_OWN_INFO' },
      { value: 'VIEW_PLANNING_INFO' },
      { value: 'EDIT_PLANNING' },
      { value: 'VIEW_COMMUNITY_INFO' },
      { value: 'ADD_ROLE' },
      { value: 'ADD_PERMISSION' },
      { value: 'CREATE_ROLE' },
      { value: 'VIEW_ALL_INFO' }
      
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};

