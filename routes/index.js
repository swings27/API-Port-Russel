var express = require('express');
var router = express.Router();

const dashboardRouter = require('../routes/dashboard');
const usersRouter = require('../routes/users');
const catwaysRouter = require('../routes/catways');
const reservationsRouter = require('../routes/reservations');

router.get('/', function(req, res, next) {
  res.render('pages/home', { 
    title: 'Capitainerie du Port Russel',
  });
});

router.use('/dashboard', dashboardRouter);
router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
router.use('/catways', reservationsRouter );

module.exports = router;
