// require('dotenv').config();

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'permissions';
    const columns = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('permissions');
  }
};
