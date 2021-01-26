const {
  User
} = require('../models');

const userData = [{
    username: 'mplumer',
    avatar: '/images/default.png',
    group_id: 1,
    first_name: "Max",
    last_name: "Plumer",
    phone: "555-555-5555",
    email: "max@max.com",
    password: "password"
  },
  {
    username: 'astribli',
    avatar: '/images/default.png',
    group_id: 1,
    first_name: "AJ",
    last_name: "Stribling",
    phone: "555-123-4567",
    email: "aj@stribli.com",
    password: "password"
  },
  {
    username: 'the-goat',
    avatar: '/images/default.png',
    group_id: 1,
    first_name: "Tom",
    last_name: "Brady",
    phone: "555-123-4567",
    email: "tom@goat.com",
    password: "password"
  },
  {
    username: 'the-kid',
    avatar: '/images/default.png',
    group_id: 1,
    first_name: "Pat",
    last_name: "Mahomes",
    phone: "555-123-4567",
    email: "pat@mahomey.com",
    password: "password"
  },
  {
    username: '007',
    avatar: '/images/default.png',
    group_id: 2,
    first_name: "James",
    last_name: "Bond",
    phone: "007-007-0070",
    email: "bond@ooseven.com",
    password: "password"
  },
  {
    username: 'Dames',
    avatar: '/images/default.png',
    group_id: 2,
    first_name: "Matt",
    last_name: "Damon",
    phone: "555-867-5309",
    email: "matt@matt.com",
    password: "password"
  },
  {
    username: 'surely',
    avatar: '/images/default.png',
    group_id: 2,
    first_name: "Shirly",
    last_name: "Temple",
    phone: "555-987-6543",
    email: "temple@xyz.com",
    password: "password"
  },
];

const seedUsers = () => {
  User.create(userData[0]);
  User.create(userData[1]);
  User.create(userData[2]);
  User.create(userData[3]);
  User.create(userData[4]);
  User.create(userData[5]);
  User.create(userData[6]);
}

module.exports = seedUsers;