const { Hole } = require('../models');

const holeData = [
  {
    number: 1,
    par: 4,
    yards: 412,
  },
  {
    number: 2,
    par: 5,
    yards: 508,
  },
  {
    number: 3,
    par: 4,
    yards: 400,
  },
  {
    number: 4,
    par: 4,
    yards: 397,
  },
  {
    number: 5,
    par: 3,
    yards: 212,
  },
  {
    number: 6,
    par: 4,
    yards: 432,
  },
  {
    number: 7,
    par: 5,
    yards: 543,
  },
  {
    number: 8,
    par: 3,
    yards: 178,
  },
  {
    number: 9,
    par: 4,
    yards: 427,
  },
  {
    number: 10,
    par: 4,
    yards: 431,
  },
  {
    number: 11,
    par: 5,
    yards: 546,
  },
  {
    number: 12,
    par: 3,
    yards: 186,
  },
  {
    number: 13,
    par: 4,
    yards: 367,
  },
  {
    number: 14,
    par: 4,
    yards: 421,
  },
  {
    number: 15,
    par: 5,
    yards: 539,
  },
  {
    number: 16,
    par: 3,
    yards: 218,
  },
  {
    number: 17,
    par: 4,
    yards: 408,
  },
  {
    number: 18,
    par: 4,
    yards: 432,
  },
];

const seedHoles = () => {
  Hole.create(holeData[0]);
  Hole.create(holeData[1]);
  Hole.create(holeData[2]);
  Hole.create(holeData[3]);
  Hole.create(holeData[4]);
  Hole.create(holeData[5]);
  Hole.create(holeData[6]);
  Hole.create(holeData[7]);
  Hole.create(holeData[8]);
  Hole.create(holeData[9]);
  Hole.create(holeData[10]);
  Hole.create(holeData[11]);
  Hole.create(holeData[12]);
  Hole.create(holeData[13]);
  Hole.create(holeData[14]);
  Hole.create(holeData[15]);
  Hole.create(holeData[16]);
  Hole.create(holeData[17]);
}

module.exports = seedHoles;