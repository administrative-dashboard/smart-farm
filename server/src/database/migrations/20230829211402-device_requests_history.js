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
      created_date: {
        type: Sequelize.DATE,
        //defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_date: {
        type: Sequelize.DATE,
        //defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      used_from: {
        type: Sequelize.DATE,
      },
      used_to: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM(['new', 'accepted', 'rejected']),
        defaultValue: 'new',
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('device_requests_history');
  },
};
