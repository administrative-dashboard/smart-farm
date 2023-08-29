'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'schedules_devices';
    const columns = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      device_request_history_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      actual_used_from: {
        type: Sequelize.DATE,
      },
      actual_used_to: {
        type: Sequelize.DATE,
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('schedules_devices');
  }
};
