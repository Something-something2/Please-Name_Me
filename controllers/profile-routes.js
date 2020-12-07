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

// router.get('/', (req, res) => {
//     {
//         res.render('profile', {
//             loggedIn: req.session.loggedIn
//         })
//     }
// });

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
                'lon'
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
router.get('/edit-profile', withAuth, (req, res) => {
    res.render('edit-profile');
});


// Profile
router.get('/', (req, res) => {
    res.redirect(`/profile/1`)
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
            }, ]
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