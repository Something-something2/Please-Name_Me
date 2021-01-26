const router = require('express').Router();
const {
  User,
  Hole,
  Group
} = require('../../models');
const withAuth = require('../../utils/auth');


// GET /api/holes
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Hole.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Group,
            attributes: ['id', 'title', 'hole_id'],
            
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['password']
                      },
                }]
            
        },
    ]
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // GET all Employees by Hole
  router.get('getallusers/', (req, res) => {
    Hole.findAll({
        where: {
            id: req.params.id
          },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: User,
            attributes: {
                exclude: ['password']
              },
        }]
      })
      .then(dbPostData => {
        console.log(dbPostData)
        if (!dbPostData) {
          res.status(404).json({
            message: 'No hole found with this id'
          });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Hole.findOne({
        where: {
            id: req.params.id
          },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Group,
            attributes: ['id', 'title', 'hole_id'],
            
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['password']
                      },
                }]
            
        },
    ]
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({
            message: 'No hole found with this id'
          });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', withAuth, (req, res) => {
    Hole.create({
        name: req.body.name
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', withAuth, (req, res) => {
    Hole.update({
        name: req.body.name
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({
            message: 'No hole found with this id'
          });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Hole.destroy({
        where: {
            id: req.params.id}
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
    });

module.exports = router;