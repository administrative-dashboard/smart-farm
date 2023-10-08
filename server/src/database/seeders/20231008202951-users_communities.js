
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users_communities', [
      { user_id: 1 , community_id: 2},
      { user_id: 2 , community_id: 4},
      { user_id: 3 , community_id: 3},
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users_communities', null, {});
  }
};