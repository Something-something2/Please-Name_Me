const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const aws = require('aws-sdk');
//const multer = require('multer')
//const upload = multer({
//  dest: 'uploads/'
//})
const app = express();
const PORT = process.env.PORT || 3001;
// const cors = require("cors");

// This uses Heroku's process.env.PORT value when deployed and 3001 when run locally. Having a dynamic port number is important, because it is very unlikely that the port number you hardcode (e.g., 3001) would be the port Heroku runs your app on.

const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
// const hbs = exphbs.create({});
const hbs = exphbs.create({
  helpers
});

// The express-session library allows us to connect to the back end. The connect-session-sequelize library automatically stores the sessions created by express-session into our database.
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// This code sets up an Express.js session and connects the session to our Sequelize database. As you may be able to guess, "Super secret secret" should be replaced by an actual secret and stored in the .env file. All we need to do to tell our session to use cookies is to set cookie to be {}. If we wanted to set additional options on the cookie, like a maximum age, we would add the options to that object.
// app.use(cors());

app.use(session(sess));

app.engine('handlebars', hbs.engine);

// app.set('views', __dirname + '/views');
// app.locals.layout = 'default';
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({
  force: false
}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


// Configure the AWS region of the target bucket.
aws.config.region = 'us-east-2';

// Load the S3 information from the environment variables.
// const S3_BUCKET = process.env.S3_BUCKET;

// app.post('/save-details', (req, res) => {
//   // TODO: Read POSTed form data and do something useful
// });

// ***************** MULTER ROUTES ********************************

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

// var cpUpload = upload.fields([{
//   name: 'avatar',
//   maxCount: 1
// }, {
//   name: 'gallery',
//   maxCount: 8
// }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })

// ***************** END MULTER ROUTES ********************************
