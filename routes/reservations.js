const express = require('express');
const router = express.Router();

router.get('/catways/:id/reservations', (req, res) => {
    const id = req.params.id;
    res.status(200).send('Voici les réservations pour le catway ' + id);
});

router.get('/catways/:id/reservations/:idReservation', (req, res) => {
    const id = req.params.id;
    res.status(200).send('Voici la réservations ' + id);
});

router.post('/catways/:id/reservations/', (req, res) => {
    res.status(201).send('Nouvelle réservation effectuée !');
});

router.put('/catways/:id/reservations', (req, res) => {
    res.status(200).send('Réservation modifiée');
});

router.delete('/catways/:id/reservations/:idReservation', (req, res) => {
    res.send('Réservation annulée');
});

module.exports = router;