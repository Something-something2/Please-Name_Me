//another file to collect the packaged API routes

const router = require('express').Router();

const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');

const dashboardRoutes = require('./dashboard-routes.js');


router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use('/dashboard', dashboardRoutes);

//if we make a request to any endpoint that doesn't exist, we'll receive a 404 error indicating we have requested an incorrect resource:
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;