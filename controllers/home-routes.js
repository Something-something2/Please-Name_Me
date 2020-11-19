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

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('home', {
        loggedIn
    })
});

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

// Edit-Profile
router.get('/edit-profile',withAuth, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('edit-profile');
});

// Add-Log
router.get('/add-log/:id', withAuth, (req, res) => {
    
    res.render('add-log');
});

// Profile
router.get('/profile', withAuth, (req, res) => {
    res.render('profile', {
        user_id: res.session.user_id
    });
});

// Signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
  });
  
module.exports = router;