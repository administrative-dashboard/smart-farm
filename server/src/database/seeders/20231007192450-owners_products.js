'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, create product types
    const productTypesData = [
      { type: 'Armenian' },
      { type: 'Russian' },
      { type: 'Indian' },
      { type: 'American' },
      { type: 'Canadian' },
    ];

    const productNameData = ['Tomato', 'Potato', 'Carrot', 'Corn', 'Cucumber'];

    const productDescriptionData = [
      'Fresh, crisp, and hand-picked.',
      'A variety of sizes and flavors to suit your needs.',
      'Delicious and nutritious.',
      'Locally-sourced, high-quality produce.',
      'Elevate your meals with our farm-fresh vegetables.',
    ];

    await queryInterface.bulkInsert('product_types', productTypesData);

    // Create farm product data
    const productsData = [];
    for (let i = 1; i <= 10; i++) {
      const productName = productNameData[faker.number.int({ min: 0, max: 4 })];
      const productTypeId = faker.number.int({ min: 1, max: 5 });
      const productDescription =
        productDescriptionData[faker.number.int({ min: 0, max: 4 })];

      productsData.push({
        name: productName,
        type_id: productTypeId,
        description: productDescription,
      });
    }

    await queryInterface.bulkInsert('products', productsData);

    // Create owners_products data
    const ownersProductsData = [];
    for (let i = 1; i <= 12; i++) {
      const userId = faker.number.int({ min: 1, max: 2 });
      const productId = faker.number.int({ min: 1, max: 20 });
      const createdAt = faker.date.past();
      const updatedAt = faker.date.recent();

      ownersProductsData.push({
        user_id: userId,
        product_id: productId,
        created_at: createdAt,
        updated_at: updatedAt,
      });
    }

    await queryInterface.bulkInsert('owners_products', ownersProductsData);

    return Promise.resolve();
  },
  async down(queryInterface, Sequelize) {
    // Remove the data you seeded in the 'up' function
    await queryInterface.bulkDelete('owners_products', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('product_types', null, {});

    return Promise.resolve();
  },
};
