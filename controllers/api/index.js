// This file, like index.js in the models folder, will serve as a means to collect all of the API routes and package them up for us.

const router = require('express').Router();

const userRoutes = require('./user-routes');
const holeRoutes = require('./hole-routes');
const groupRoutes = require('./group-routes');

router.use('/holes', holeRoutes);
router.use('/groups', groupRoutes);
router.use('/users', userRoutes);



module.exports = router;
