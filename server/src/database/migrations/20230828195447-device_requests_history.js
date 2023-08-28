'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'device_requests_history';
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
      device_id: {
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
    await queryInterface.dropTable('device_requests_history');
  }
};
