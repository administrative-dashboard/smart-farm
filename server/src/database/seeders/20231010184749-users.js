module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Manager',
          email: 'community.manager.vanadzor@gmail.com',
          phone_number: '+374',
          profile_image: ' ',
        },
        {
          name: 'Manager',
          email: 'manageralaverdi@gmail.com',
          phone_number: '+374',
          profile_image: ' ',
        },
        {
          name: 'Owner',
          email: 'owneralaverdi@gmail.com',
          phone_number: '+374',
          profile_image: ' ',
        },
        {
          name: 'Owner',
          email: 'ownervanadzor@gmail',
          phone_number: '+374',
          profile_image: ' ',
        },
        {
          name: 'Admin',
          email: 'smartfarmadm@gmail.com',
          phone_number: '+374',
          profile_image: ' ',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
