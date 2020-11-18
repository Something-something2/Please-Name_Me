const router = require('express').Router();

const apiRoutes = require('./api');
const adminRoutes = require('./admin-routes.js');
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes.js');

router.use('/home', homeRoutes);
router.use('/', loginRoutes);
router.use('/api', apiRoutes);
router.use('/admin', adminRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router; 