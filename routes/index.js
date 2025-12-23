var express = require('express');
var router = express.Router();

const usersRouter = require('../routes/users');
const catwaysRouter = require('../routes/catways');
const reservationsRouter = require('../routes/reservations');

router.get('/', function(req, res, next) {
  res.render('pages/home', { 
    title: 'API Port Russel',
    message: 'Capitainerie du Port Russel',
    infos: "Veuillez vous connecter pour accéder à nos services." 
  });
});

router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
router.use('/catways', reservationsRouter );

module.exports = router;
