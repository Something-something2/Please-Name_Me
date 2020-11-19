const router = require("express").Router();
const sequelize = require('../config/connection')
const { User, } = require('../models')



router.get('/', (req, res) => {
  console.log(req.session.admin);
  if (req.session.admin) {
    res.redirect('/admin');
  } else {
    res.redirect('/');
  }
})

// Signup
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }

  res.render(document.querySelector('#modalRegisterForm'));
});


// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Profile
router.get('/profile', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  };

  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'first_name',
      'email',
      'password',
    ],
  })

    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      // serialize the data
      const user = dbUserData.get({ plain: true });

      // pass data to template
      res.render('profile', {
        user_id: req.session.user_id,
        user,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit-Profile
router.get('/edit-profile', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  };

  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'first_name',
      'email',
      'password',
    ],
  })

    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      // serialize the data
      const user = dbUserData.get({ plain: true });

      // pass data to template
      res.render('edit-profile', {
        user_id: req.session.user_id,
        user,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;