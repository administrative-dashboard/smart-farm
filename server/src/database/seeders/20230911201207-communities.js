
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('communities', [
      { name: 'Վանաձոր' },
      { name: 'Փամբակ' },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('communities', null, {});
  }
};