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

/*router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Pin.findAll({
            attributes: [
                'id',
                'user_id'
            ],
            include: [{
                model: User,
            }]
        })
        .then(dbPinData => {
            const pins = dbPinData.map(pin => pin.get({
                plain: true
            }));
            // pass a single pin object into the homepage template
            res.render('login', {
                noNav: true,
                pins,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});*/

// Signup
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login', {
        noNav: true
    });
});

router.get('/home', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('home', {

    });
});

router.get('/pin/:id', (req, res) => {
    Pin.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'user_id'
            ],
            include: [{
                model: User,
            }]
        })
        .then(dbPinData => {
            if (!dbPinData) {
                res.status(404).json({
                    message: 'No pin found with this id'
                });
                return;
            }

            // serialize the data
            const pin = dbPinData.get({
                plain: true
            });

            // pass data to template
            res.render('single-pin', {
                pin,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Profile
router.get('/profile', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    };
  
    User.findOne({
      where: {
        id: req.session.user_id
      },
      attributes: [
        'id',
        'email',
        'password'
      ],
    })
  
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
  
        // serialize the data
        const user = dbUserData.get({ plain: true });
  
        // pass data to template
        res.render('profile', {
          user_id: req.session.user_id,
          user,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // Edit-Profile
  router.get('/edit-profile', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    };
  
    User.findOne({
      where: {
        id: req.session.user_id
      },
      attributes: [
        'id',
        'email',
        'password',
      ],
    })
  
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
  
        // serialize the data
        const user = dbUserData.get({ plain: true });
  
        // pass data to template
        res.render('edit-profile', {
          user_id: req.session.user_id,
          user,
          loggedIn: req.session.loggedIn
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

module.exports = router;