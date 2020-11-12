const router = require('express').Router();
const {
  Pin,
  User
} = require('../../models');
const sequelize = require('../../config/connection');

router.get('/:id', (req, res) => {
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

router.get('/user/:id', (req, res) => {
  Pin.findAll({
      where: {
        user_id: req.params.id
      },
      attributes: [
        'id', 'lat', 'long'
      ],
    })
    .then(dbPinData => {
      if (!dbPinData) {
        res.status(404).json({
          message: 'No pins belonging to a user with this id!'
        });
        return;
      }
      res.json(dbPinData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.post('/', (req, res) => {

  Pin.create({
      user_id: req.body.user_id,
      lat: req.body.lat,
      long: req.body.long
    })
    .then(dbPinData => res.json(dbPinData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Pin.update({
      user_id: req.body.user_id,
      lat: req.body.lat,
      long: req.body.long
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

router.delete('/:id', (req, res) => {
  Pin.destroy({
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

module.exports = router;