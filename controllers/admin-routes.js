const router = require('express').Router();
const sequelize = require('../config/connection')
const {
  Pin,
  User,
  Image
} = require('../models')
const fs = require('fs')
const withAuth = require('../utils/auth');
var multer = require('multer')
var upload = multer({
  dest: 'uploads/'
})

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  Pin.findAll({
    order: ['DESC'],
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'user_id',
      'lat',
      'lon'
    ],
    include: [
      {
        model: User,
        attributes: ['first_name', 'admin']

      },
      {
        model: Comment,
        attributes: ['comment_text']

      }
    ]
  })
    .then(dbPinData => {
      console.log("@#$!!!!!!!!!!!!!!!!!!")
      console.log(req.session.user_id);
      console.log(req.session.admin);
      console.log(req.session.loggedIn);
      const Pins = dbPinData.map(Pin => Pin.get({ plain: true }));
      // pass a single Pin object into the homepage template
      res.render('admin', {
        Pins,
        loggedIn: req.session.loggedIn,
        admin: req.session.admin
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/admin');
    return;
  }

  res.render('login');
});

module.exports = router;