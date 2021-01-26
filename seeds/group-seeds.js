//const { TIME } = require('sequelize/types');
const { Group } = require('../models');

const groupData = [
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 1,
  },
  {
    players: 4,
    tee_time: '11:00',
    hole_id: 1,
  },
  {
    players: 4,
    tee_time: '13:00',
    hole_id: 1,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 2,
  },
  {
    players: 4,
    tee_time: '11:00',
    hole_id: 2,
  },
  {
    players: 4,
    tee_time: '13:00',
    hole_id: 2,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 3,
  },
  {
    players: 4,
    tee_time: '11:00',
    hole_id: 3,
  },
  {
    players: 4,
    tee_time: '13:00',
    hole_id: 3,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 4,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 5,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 6,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 7,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 8,
  },
  {
    players: 4,
    tee_time: '9:00',
    hole_id: 9,
  }
];

const seedGroups = () => Group.bulkCreate(groupData);

module.exports = seedGroups;