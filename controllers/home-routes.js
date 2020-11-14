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
                pins,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/home', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('home', {
        noNav: true
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