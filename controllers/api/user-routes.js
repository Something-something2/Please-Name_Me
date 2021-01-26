const router = require('express').Router();
const AWS = require('aws-sdk');
const fs = require("fs")
const {
  User,
  Department,
  Role
} = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
})
// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll({
      attributes: {
        // exclude: ['password']
      },
      include: [{
        model: Role,
        attributes: {
          exclude: ['createdAt', 'updatedAt']


        }
      }, ]
      // we've provided an attributes key and instructed the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
      where: {
        id: req.params.id
      },
      attributes: {
        exclude: ['password']
      },
      // replace the existing `include` with this
      include: [{
        model: Role,
        attributes: ['id', 'title', 'department_id'],
        include: [{
          model: Department,
          attributes: ['id', 'name']

        }]
      }]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id'
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

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
      username: req.body.username,
      role_id: req.body.role_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    })
    // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.post('/login', (req, res) => {
  // A GET method carries the request parameter appended in the URL string, whereas a POST method carries the request parameter in req.body, which makes it a more secure way of transferring data from the client to the server. Remember, the password is still in plaintext, which makes this transmission process a vulnerable link in the chain.
  // Query operation
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  console.log(req.body)
  User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      console.log("db user data", dbUserData)
      if (!dbUserData) {
        res.status(400).json({
          message: 'No user with that email address!'
        });
        return;
      }



      // Verify user
      const validPassword = dbUserData.checkPassword(req.body.password);
      console.log("valid password", validPassword)
      if (!validPassword) {
        res.status(400).json({
          message: 'Incorrect password!'
        });
        return;
      }
      //  res.json({ user: dbUserData });

      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({
          user: dbUserData,
          message: 'You are now logged in!'
        });
      })

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      res.render('homepage')
    });
  } else {
    res.status(404).end();
  }
});
const bucketRegion = 'us-east-2'

router.post('/avatar', withAuth, upload.single('avatar'), (req, res) => {
  const s3 = new AWS.S3();
  var fileName = Math.random().toString().substr(2);
  let bucketName = 'cloud-rolodex'
  var filePath = 'avatars/' + fileName;
  var fileUrl = 'https://' +
    bucketName + '.s3.' + bucketRegion + '.amazonaws.com/' + filePath;
  let params = {
    Key: filePath,
    Body: fs.createReadStream(req.file.path),
    ACL: 'public-read',
    Bucket: bucketName
  }
  // use aws.s3.putObject(params).promise().then((resp)=>{console.log(resp)}) to upload the file
  console.log("params", params);
  s3.putObject(params).promise().then((resp) => {
    console.log(resp)
    // upload worked 
    // add URL to avatar field on user model
    // user.avatar = fileUrl
    // user.save()
    User.update({
      avatar: fileUrl
    }, {
      where: {
        id: req.session.user_id
      }
    }).then(() => {
      res.status(200).json({
        message: 'COOL!',
        url: fileUrl
      });
    })

  }).catch((err) => {
    console.log(err)
    res.status(500).json({
      message: 'oops!',
    });
  })


});

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  console.log("BODY:", req.body);
  User.update(req.body, {
      // individualHooks: false,
      where: {
        id: req.session.user_id
        // TODO: Ensure that req.params.id = current userID
      }
    })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({
          message: 'No user found with this id'
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



// DELETE /api/users//
// router.delete('/:id', withAuth, (req, res) => {
//   // TO DO: ENSURE USERS CAN ONLY DELETE THEMSELVES
//   User.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({
//           message: 'No user found with this id'
//         });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


module.exports = router;