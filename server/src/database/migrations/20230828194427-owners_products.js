'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'owners_products';
    const columns = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('owners_products');
  }
};
