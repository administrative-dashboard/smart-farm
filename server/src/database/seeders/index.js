// // src/database/seeders/index.ts
// const { Umzug, Sequelize } = require('umzug');
// const path = require('path');
// const { Sequelize: SequelizeInstance } = require('sequelize'); // Переименовали переменную
// const sequelize = new SequelizeInstance({
//   dialect: 'postgres',
//   host: process.env.PG_HOST,
//   port: Number(process.env.PG_PORT),
//   username: process.env.PG_USERNAME,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
// });

// const umzug = new Umzug({
//   migrations: {
//     path: path.join(__dirname, './'),
//     params: [sequelize.getQueryInterface(), SequelizeInstance], // Используем переименованную переменную
//   },
//   storage: 'sequelize',
//   storageOptions: {
//     path: path.join(__dirname, 'umzug.json'),
//   },
// });

// (async () => {
//   try {
//     const seeds = await umzug.up();
//     console.log('Seeds executed:', seeds);
//   } catch (error) {
//     console.error('Error during seeding:', error);
//   } finally {
//     await sequelize.close();
//   }
// })();
