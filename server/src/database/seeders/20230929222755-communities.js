
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('communities', [
      { name: 'Vanadzor' },
      { name: 'Alaverdi' },
      { name: 'Spitak' },
      { name: 'Stepanavan ' },
      { name: 'Tashir' },
      { name: 'Akhtala' },
      { name: 'Tumanyan' },
      { name: 'Gyulagarak' },
      { name: 'Pambak' },
      { name: 'Odzun' },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('communities', null, {});
  }
};