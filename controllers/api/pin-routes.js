const router = require('express').Router();
const {
  Pin,
  User,
  Image
} = require('../../models');
const sequelize = require('../../config/connection');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const withAuth = require("../../utils/auth");

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
        'id', 'lat', 'lon'
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
      lon: req.body.lon
    })
    .then(dbPinData => res.json(dbPinData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Pin.update({
      user_id: req.body.user_id,
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

router.delete('/:id', withAuth, (req, res) => {
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

router.post('/upload/:id',withAuth,  upload.single('image'), (req, res) => {
  try {
      console.log(req.file);
      console.log(__basedir + req.file.path)

      if (req.file == undefined) {
          return res.send(`You must select a file.`);
      }

      Image.create({
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
              __basedir + "\\" + req.file.path
          ),
          pin_id: req.params.id
      })
      return res.send(`File has been uploaded.`);
  } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
  }
})

module.exports = router;