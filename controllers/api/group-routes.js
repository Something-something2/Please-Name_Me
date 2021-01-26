const router = require('express').Router();
const {
  User,
  Hole,
  Group
} = require('../../models');
const withAuth = require('../../utils/auth');


// GET /api/groups
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
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
    }]
    
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Group.findOne({
      where: {
        id: req.params.id
      },
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
  }]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'No group found with this id.'
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', withAuth, (req, res) => {
    Group.create({
        title: req.body.title,
        hole_id: req.body.hole_id
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', withAuth, (req, res) => {
    Group.update(req.body,  {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({
            message: 'No group found with this id.'
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
    Group.destroy({
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