// require('dotenv').config();

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'greenhouses_sensors';
    const columns = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sensor_id: {
        type: Sequelize.INTEGER,
      },
      field_id: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      measurement_id: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('greenhouses_sensors');
  }
};
