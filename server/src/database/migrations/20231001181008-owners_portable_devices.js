// require('dotenv').config();
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'owners_portable_devices';
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
      portable_device_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      is_shared: {
        type: Sequelize.BOOLEAN,
      },
      shared_quantity: {
        type: Sequelize.INTEGER,
      },
    };
    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('owners_portable_devices');
  }
};