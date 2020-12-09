const router = require('express').Router();
const {
  Pin,
  User,
  Comment,
  Image
} = require('../../models');
const sequelize = require('../../config/connection');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs')

router.get('/', (req, res) => {
  Pin.findAll({
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
    .then(dbPinData => res.json(dbPinData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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

    // pass data to template
    res.render('single-Pin', {
        user_id: req.session.user_id,
        Pin,
        loggedIn: req.session.loggedIn,
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

/*router.get('/users/:id', (req, res) => {
  Pin.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      'id', 'city', 'lat', 'lon'
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
})*/

// Create Pin
router.post('/', (req, res) => {
  Pin.create({
    user_id: req.session.user_id,
    city: req.body.city,
    lat: req.body.lat,
    lon: req.body.lon
  })
    .then(dbPinData => res.json(dbPinData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Edit-Pin
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

//Delete Pin
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

router.post('/upload/:id', upload.single('image'), (req, res) => {
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