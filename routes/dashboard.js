const express = require("express");
const router = express.Router();
const Booking = require("../models/reservations");
const Catway = require('../models/catways');

const private = require("../middlewares/private");
const data = require("../middlewares/data");

router.get("/", private.checkJWT, data.loadUserAndDate, async (req, res) => {
	try {
    const now = new Date();

    //Récupérer tous les bookings
	const bookings = await Booking.find().sort({ catwayNumber: 1 }).lean(); 

    //Récupérer tous les catways pour avoir leur id
    const catways = await Catway.find().lean();
    const catwayMap = {};
    catways.forEach(c => {
      catwayMap[c.catwayNumber] = c._id;
    });
    
    //Filtrer seulement les réservations en cours et ajouter catwayId
    const currentBookings = bookings 
    .filter(r => r.startDate && r.endDate && new Date(r.startDate) <= now && new Date(r.endDate) >= now) 
    .map(r => ({
        ...r,
        catwayId: catwayMap[r.catwayNumber] || null,
        startDate: new Date(r.startDate),
        endDate: new Date(r.endDate)
      }))
      .filter(r => r.catwayId); 
    
    res.render('pages/dashboard', { 
        bookings: currentBookings, 
        content: 'listing' });
	
} catch (error) {
		console.error("Erreur dashboard:", error);
		res.status(500).send("Erreur serveur");
	}
});

module.exports = router;
