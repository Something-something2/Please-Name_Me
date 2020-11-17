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
      order: [['created_at', 'DESC']],
      where: {
        // use the ID from the session
        user_id: req.session.user_id
    },
      attributes: [
        'id',
        'user_id'
      ],
      include: [
        {
          model: User,
          attributes: ['admin']
        }
      ]
    })
      .then(dbPinData => {
        const Pins = dbPinData.map(Pin => Pin.get({ plain: true }));
        // pass a single Pin object into the homepage template
        res.render('dashboard', {
          user_id: req.session.user_id,
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
  

// GET single Pin
router.get('/Pin/:id', (req, res) => {
    Pin.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'user_id'
      ],
      include: [
        {
          model: User,
        }
      ]
    })
      .then(dbPinData => {
        if (!dbPinData) {
          res.status(404).json({ message: 'No Pin found with this id' });
          return;
        }
  
        // serialize the data
        const Pin = dbPinData.get({ plain: true });
  
        // pass data to template
        res.render('single-Pin', {
          user_id: req.session.user_id,
          Pin,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;