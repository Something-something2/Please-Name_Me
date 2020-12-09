const router = require('express').Router();
const sequelize = require('../config/connection')
const {
    Pin,
    User,
    Comment,
    Image
} = require('../models')
const fs = require('fs')
const withAuth = require('../utils/auth');
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

// GET All Pins
router.get('/', (req, res) => {
    Pin.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: [
            'id',
            'user_id',
            'city',
            'lat',
            'lon'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'pin_id'],
            include: {
                model: User,
                model: Pin
            }
        },
        {
            model: Image,
            attributes: ['id', 'type', 'name', 'data', 'pin_id'],
            include: {
                model: Pin
            }

        }
        ]
    })
    .then(dbPinData => {
        if (!dbPinData) {
            res.status(404).json({
                message: 'No Pin found with this id'
            });
            return;
        }

        // serialize the data
        const Pins = dbPinData.map(pin => pin.get({ plain: true }));

        // pass data to template
        res.render('single-Pin', {
            user_id: req.session.user_id,
            Pins,
            loggedIn: req.session.loggedIn,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// GET single Pin
router.get('/pins/:id', (req, res) => {
    Pin.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'user_id',
            'city',
            'lat',
            'lon'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'pin_id'],
            include: {
                model: User,
                model: Pin
            }
        },
        {
            model: Image,
            attributes: ['id', 'type', 'name', 'data', 'pin_id'],
            include: {
                model: Pin
            }

        }
        ]
    })
    .then(dbPinData => {
        if (!dbPinData) {
            res.status(404).json({
                message: 'No Pin found with this id'
            });
            return;
        }

        // serialize the data
        const Pins = dbPinData.map(pin => pin.get({ plain: true }));

        // pass data to template
        res.render('single-Pin', {
            user_id: req.session.user_id,
            Pins,
            loggedIn: req.session.loggedIn,
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

// Edit-Pin
router.put('/:id', (req, res) => {
    Pin.update({
      city: req.body.city,
      lat: req.body.lat,
      lon: req.body.lon
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(dbPinData => {
        if (!dbPinData) {
          res.status(404).json({
            message: 'No pin found with this id'
          });
          return;
        }
        res.json(dbPinData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
/*router.get('/edit-pin/:id', (req, res) => {
    Pin.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id'
        ],
        include: {
            model: User,
        }
    })
        .then(dbPinData => {
            if (!dbPinData) {
                res.status(404).json({
                    message: 'No pin found with this id'
                });
                return;
            }

            // serialize the data
            const Pins = dbPinData.map(Pin => Pin.get({ plain: true }));
            res.render('edit-pin', { Pins, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});*/


// Profile
router.get('/', (req, res) => {
    res.redirect(`/profile`)
    if (req.session.loggedIn) {
        console.log("You are logged in, redirecting...");
        res.redirect(`/${req.session.user_id}`)
    } else {
        console.log("Please work.");
        res.redirect('/login');
    }
});

router.get('/:id', (req, res) => {
    console.log("This is different.");
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Pin,
            attributes: ['id'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at']
            },
            {
                model: Image,
                attributes: ['id', 'data']
            }
            ]
        },]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.render('profile', {
                user: dbUserData.dataValues
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;