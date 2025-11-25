var express = require('express');
var router = express.Router();

const usersRouter = require('../routes/users');
const catwaysRouter = require('../routes/catways');

/** 
* @openapi
* /:
*   get:
*     description: Page d'accueil
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/catways', catwaysRouter);

module.exports = router;
