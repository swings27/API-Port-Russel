const express = require("express");
const router = express.Router();
const Booking = require("../models/reservations");
const Catway = require("../models/catways");

const private = require("../middlewares/private");
const data = require("../middlewares/data");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: >
 *     Centralise via sa vue les différentes vues nécessaires aux opérations CRUD. Et affiche toutes les réservations en cours.
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Tableau de bord des réservations en cours
 *     description: Affiche la page dashboard avec toutes les réservations actuellement en cours et leurs catways associés pour visionnage
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []  # JWT requis
 *     responses:
 *       200:
 *         description: Page dashboard rendue avec succès
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>...</html>"
 *       401:
 *         description: Non autorisé (JWT invalide ou manquant)
 *       500:
 *         description: Erreur serveur
 */
router.get("/", private.checkJWT, data.loadUserAndDate, async (req, res) => {
	try {
		const now = new Date();

		//Récupérer tous les bookings
		const bookings = await Booking.find().sort({ catwayNumber: 1 }).lean();

		//Récupérer tous les catways pour avoir leur id
		const catways = await Catway.find().lean();
		const catwayMap = {};
		catways.forEach((c) => {
			catwayMap[c.catwayNumber] = c._id;
		});

		//Filtrer les réservations en cours et ajouter catwayId
		const currentBookings = bookings
			.map((r) => ({
				...r,
				startDate: new Date(r.startDate),
				endDate: new Date(r.endDate),
				catwayId: catwayMap[r.catwayNumber] || null,
			}))
			.filter((r) => r.startDate <= now && r.endDate >= now && r.catwayId);

		res.render("pages/dashboard", {
			bookings: currentBookings,
			content: "listing",
		});
	} catch (error) {
		console.error("Erreur dashboard:", error);
		if (req.originalUrl.startsWith("/api")) {
			res.status(500).json({ error: "Erreur serveur" });
		} else {
			res.render("pages/error", { error: "Erreur serveur" });
		}
	}
});

module.exports = router;
