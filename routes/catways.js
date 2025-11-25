const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Voici les catways');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send('Voici le catway ' + id);
});

router.post('/', (req, res) => {
    res.status(201).send('Nouveau catway ajouté !');
});

router.put('/:id', (req, res) => {
    res.status(200).send('Catway modifié');
});

router.delete(':id', (req, res) => {
    res.send('Catway supprimé');
});

module.exports = router;