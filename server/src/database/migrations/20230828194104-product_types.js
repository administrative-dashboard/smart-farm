// require('dotenv').config();

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'product_types';
    const columns = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('product_types');
  }
};
