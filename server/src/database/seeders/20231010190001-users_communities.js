
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users_communities', [
      { user_id: 5, community_id: 1 },
      { user_id: 6, community_id: 2 },
      { user_id: 7, community_id: 2 },
      { user_id: 8, community_id: 1 },
      { user_id: 9, community_id: 1 },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users_communities', null, {});
  }
};