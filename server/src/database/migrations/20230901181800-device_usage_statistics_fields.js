module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'device_usage_statistics_fields';
    const columns = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
       field_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      device_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      device_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    };

    await queryInterface.createTable(tableName, columns);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('device_usage_statistics_fields');
  }
};