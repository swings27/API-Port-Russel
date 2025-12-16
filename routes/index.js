var express = require('express');
var router = express.Router();

const usersRouter = require('../routes/users');
const catwaysRouter = require('../routes/catways');
const reservationsRouter = require('../routes/reservations');

/** 
* @openapi
* /:
*   get:
*     description: Page d'accueil
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Port Russel' });
});

router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);
router.use('/catways/:id/reservations', reservationsRouter );

module.exports = router;
