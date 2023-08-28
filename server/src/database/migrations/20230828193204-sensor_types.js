// require('dotenv').config();

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'sensor_types';
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
      measurement_id: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('sensor_types');
  }
};
