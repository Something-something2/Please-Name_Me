const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const pinRoutes = require('./pin-routes');


router.use('/users', userRoutes);
router.use('/pins', pinRoutes);


module.exports = router; 