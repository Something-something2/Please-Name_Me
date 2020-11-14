const router = require('express').Router();
const sequelize = require('../config/connection')
const { Pin, User, } = require('../models')

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Pin.findAll({
        attributes: [
            'id'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPinData => {
            const pins = dbPinData.map(pin => pin.get({ plain: true }));
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
});

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
  
    res.render('login');
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
            'id'           
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPinData => {
            if (!dbPinData) {
                res.status(404).json({ message: 'No pin found with this id' });
                return;
            }

            // serialize the data
            const pin = dbPinData.get({ plain: true });

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

module.exports = router; 