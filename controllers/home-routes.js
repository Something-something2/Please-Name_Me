const router = require('express').Router();
const sequelize = require('../config/connection')
const {
    Pin,
    User,
    Comment,
    //Image
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
        order: [['DESC']],
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'user_id',
            'lat',
            'long'
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
            const Pins = dbPinData.map(Pin => Pin.get({ plain: true }));
            // pass a single Pin object into the homepage template
            res.render('/home', {
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
            'user_id',
            'lat',
            'long'
        ],
        include: [
            {
                model: User,
                attributes: ['first_name']

            },
            {
                model: Comment,
                attributes: ['comment_text']

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
                loggedIn: req.session.loggedIn,
                admin: req.session.admin
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Add-Pin
router.get('/add-pin/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    };

    res.render('add-pin', {
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn
    });
});

 // Edit-Profile
 router.get('/edit-profile', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  
    res.render('edit-profile');
  });
  
  // Add-Log
  router.get('/add-log/:id', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    };
  
    res.render('add-log');
  });
  
  // Profile
  router.get('/profile', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  
    res.render('profile');
  });
  
  // Login
  router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  // Signup
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
  
    module.exports = router;



module.exports = router;