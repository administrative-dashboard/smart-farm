
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users_communities', [
      { user_id: 1, community_id: 1 },
      { user_id: 2, community_id: 2 },
      { user_id: 3, community_id: 2 },
      { user_id: 4, community_id: 1 },
      { user_id: 5, community_id: 1 },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users_communities', null, {});
  }
};