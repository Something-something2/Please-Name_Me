const router = require('express').Router();
const sequelize = require('../config/connection')
const {
    Pin,
    User,
    Image
} = require('../models')
const fs = require('fs')

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})
// took out with Auth for demo purposes
router.get('/', (req, res) => {
    Pin.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.id
        },
        attributes: [
            'id',
        ],
        include: [
            {
                model: User,
            }
        ]
    })
        .then(dbPinData => {
            // serialize data before passing to template
            const Pins = dbPinData.map(Pin => Pin.get({ plain: true }));
            res.render('add-pin', { Pins, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
    console.log(req.session.user_id);
    console.log(req.params.id);


    Pin.findOne({
        where: {
            // use the ID from the session
            // user_id: req.session.user_id
            id: req.params.id
        },
        attributes: [
            'id',
        ],
        include: [
            {
                model: User,
            }
        ]
    })
        .then(dbPinData => {

            // serialize data before passing to template
            const Pin = dbPinData.get({ plain: true });

            console.log("title", Pin.title);
            console.log("Pin_text", Pin.Pin_text);

            res.render('edit-Pin', { Pin, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;