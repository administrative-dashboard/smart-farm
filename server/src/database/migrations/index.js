//src/database/migrations/index.js
const Umzug = require('umzug');
const  Sequelize  = require('sequelize');
const path = require('path');


const sequelize = new Sequelize({
    dialect: 'postgres', 
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, './'), 
    params: [
        sequelize.getQueryInterface()
      ]
  },
  storage: 'sequelize',
  storageOptions: { sequelize }
});

(async () => {
  try {
    const migrations = await umzug.up();
    console.log('Migrations executed:', migrations);
  } catch (error) {
    console.error('Error during migrations:', error);
  } finally {
    await sequelize.close();
  }
})();
