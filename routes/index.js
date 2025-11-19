var express = require('express');
var router = express.Router();

/** 
* @openapi
* /:
*   get:
*     description: Page d'accueil
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
