const router = require('express').Router();
const sequelize = require('../config/connection');
const aws = require('aws-sdk');
const { Op } = require("sequelize");
const {
  User,
  Hole,
  Group
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/my-user-card', withAuth, (req, res) => {
  Hole.findAll({
    attributes: {
      include: ['id', 'number'],
      exclude: ['createdAt', 'updatedAt']
    }
  }).then((dbHoleData) => {
    const holes = dbHoleData.map((hole) => hole.get({ plain: true }));
    console.log("hole pulled from db", holes)
    return holes;
    
  }).then(holes => {
    Group.findAll({
      model: Group,
      attributes: ["hole_id"]
    })
    .then((dbGroupData) => {
      const groups = dbGroupData.map((group) => group.get({ plain: true }));
      console.log("hole id pulled from within groups, within hole", groups)
      return groups;
      
    })
    .then(groups => {
      User.findAll({
        where: {
         id: req.session.user_id
      },
      attributes: {
        include: ['id', 'first_name', 'avatar', 'last_name', 'phone', 'email', 'group.hole_id'],
        exclude: ['password'],
      },
      include: [{
        model: Group,
        attributes: ['id', 'players', 'tee_time', 'hole_id'],
        include: [{
          model: Hole,
          attributes: ["number"]
        }],
      }],
    })
      .then((dbUserData) => {
        const user = dbUserData.map((user) => user.get({ plain: true }))
        console.log("final user returned:", user)
        res.render('my-user-card', {
          user,
          holes,
          groups,
          loggedIn: true,
          layout: 'nonav.handlebars'
        })
      })
    })
  })
})



router.get('/all-users', withAuth, (req, res) => {
  User.findAll({

    attributes: {
      include: ['first_name', 'avatar', 'last_name', 'phone', 'email', 'group.hole_id'],
      exclude: ['password'],
    },
    include: [{
      model: Group,
      attributes: ['id', 'players', 'tee_time', 'hole_id'],
      include: {
        model: Hole,
        attributes: ["number"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      res.render('all-users', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/', withAuth, (req, res) => {
  console.log("REQ", req);
  console.log("SESSION", req.session.user_id);
  const id = req.session.user_id;

  Hole.findAll({
    attributes: ["id", "number"]
  })
    .then((dbPostData) => {
      const holes = dbPostData.map((hole) => hole.get({ plain: true }))

      res.render('dashboard', {
        holes,
        id,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log("ERROR", err);
      res.status(500).json(err);
    });
})

router.get('/users-by-name', withAuth, (req, res) => {
  console.log("QUERY STRING", req.query)
  User.findAll({
    where: {
      first_name: {
        [Op.like]: `%${req.query["first-name"]}%`
      }
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'group.hole_id'],
      exclude: ['password'],
    },
    include: [{
      model: Group,
      attributes: ['id', 'players', 'tee_time', 'hole_id'],
      include: {
        model: Hole,
        attributes: ["number"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))

      console.log("user object being sent to handlebars", users);
      res.render('users-by-name', {
        users,
        loggedIn: true,
        // layout: 'nonav.handlebars'
      });
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


router.get('/:id', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findOne({

    where: {
      id: req.session.user_id
    },
    attributes: {
      exclude: ['password']
    },

    // we've provided an attributes key and instructed the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
  })
    .then(dbUserData => {
      // serialize data before passing to template
      const user = dbUserData.get({
        plain: true
      });
      res.render('dashboard', {
        user,
        loggedIn: true
      });
    })
})



const allHoles = Hole.findAll({
  attributes: {
    exclude: ['createdAt', 'updatedAt']
  },
  include: [{
    model: Group,
    attributes: ['id', 'players', 'tee_time', 'hole_id'],

    include: [{
      model: User,
      attributes: {
        exclude: ['password']
      },
    }]

  }, ]
})
const allGroups = Group.findAll({
  attributes: {
    exclude: ['createdAt', 'updatedAt']
  },
  include: [{
      model: Hole,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    },
    {
      model: User,
      attributes: {
        exclude: ['password']
      },
    }
  ]

})



router.get('/edit/:id', withAuth, (req, res) => {
  User.findOne({
      // individualHooks: true,
      where: {
        id: req.params.id
      },
      include: [{
        model: Group,
        attributes: ['id', 'players', 'tee_time', 'hole_id'],
        include: {
          model: Hole,
          attributes: ["number"]
        },
      }, ]
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

    }).then(user => {
      Group.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [{
              model: Hole,
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
            },
            {
              model: User,
              attributes: {
                exclude: ['password']
              },
            }
          ]

        })

        .then((dbGroupData) => {

          const groups = dbGroupData.map((group) => group.get({
            plain: true
          }))
          console.log("Groups:", groups);
          res.render('edit-user', {
              user,
              groups,
              loggedIn: req.session.loggedIn,
              
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        });
    });
});



module.exports = router;