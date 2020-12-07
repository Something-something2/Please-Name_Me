const router = require('express').Router();

const apiRoutes = require('./api');
const adminRoutes = require('./admin-routes.js');
const profileRoutes = require('./profile-routes.js');
const homeRoutes = require('./home-routes.js');
const addPinRoutes = require('./add-pin-routes.js');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);
router.use('/admin', adminRoutes);
router.use('/add-pin', addPinRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router; 