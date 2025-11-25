var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('Voici la liste des utilisateurs');
  next();
});

router.get('/:email', (req, res) => {
  const email = req.params.email;
  res.status(200).send("Voici l'utilisateur " + email);
});

router.post('/', (req, res) => {
    res.status(201).send('Nouvel utilisateur ajouté !');
});

router.put('/:email', (req, res) => {
    res.status(200).send('Utilisateur modifié');
});

router.delete(':email', (req, res) => {
    res.send('Utilisateur supprimé');
});

module.exports = router;
