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


// GET single Pin
router.get('/pin/:id', (req, res) => {
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
            include: [{
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
                res.status(404).json({
                    message: 'No Pin found with this id'
                });
                return;
            }

            // serialize the data
            const Pin = dbPinData.get({
                plain: true
            });

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
router.get('/add-pin/:id', withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    };

    res.render('add-pin', {
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn
    });
});

// Edit Pin

router.get('/pin/:id', (req, res) => {
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
            include: [{
                    model: User,

                },
                {
                    model: Comment,
                    attributes: ['comment_text']

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
            const Pin = dbPinData.get({
                plain: true
            });

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

// Delete Pin
router.get('delete-pin', withAuth, (req, res) => {
    res.render('edit-user');
});

// Edit User
router.get('/edit-user', withAuth, (req, res) => {
    res.render('edit-user');
});


// User
router.get('/user', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect(`/user/${req.session.user_id}`)
    } else {
        res.redirect('/');
    }
});

router.get('/user/:id', (req, res) => {
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
            }, ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.render('user', {
                user: dbUserData.dataValues
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


router.get('/edit/:id', withAuth, (req, res) => {
    User.findOne({
        // individualHooks: true,
        where: {
          id: req.params.id
        }
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'No user found with this id'
          });
          return;
        }
   
        const user = dbUserData.get({
          plain: true
        });
        return user;
  
      })
          
  });

module.exports = router;