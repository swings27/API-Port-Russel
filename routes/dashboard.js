const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Reservation = require('../models/reservations');

const private = require('../middlewares/private');

router.get('/', private.checkJWT, async (req, res) => {

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.redirect('/');
        }

        const now = new Date();

        //Récupérer les réservations
        const reservations = await Reservation.find();

        // Filtrer seulement les réservations en cours
        const currentReservations = reservations
            .filter(r => r.startDate && r.endDate && r.startDate <= now && r.endDate >= now)
            .map(r => r.toObject()); // convertir en objet JS simple pour EJS

        res.render('pages/dashboard', {
            user,
            date: now.toLocaleDateString('fr-FR'),
            reservations: currentReservations,
            content: 'listing'
        });
    } catch (error) {
        console.error('Erreur dashboard:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;