const seedHoles = require('./hole-seeds');
const seedGroups = require('./group-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedHoles();
  console.log('\n----- HOLES SEEDED -----\n');

  await seedGroups();
  console.log('\n----- GROUPS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();