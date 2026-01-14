const express = require("express");
const router = express.Router();

const dashboardRouter = require("../routes/dashboard");
const usersRouter = require("../routes/users");
const catwaysRouter = require("../routes/catways");
const reservationsRouter = require("../routes/reservations");

/**
 * @swagger
 * tags:
 *   name: Index
 *   description: >
 *     Permet de regrouper les routers de toutes les routes pour ensuite les passer au fichier app.js.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Page d'accueil
 *     description: Affiche la page principale de l'application
 *     tags: [Index]
 *     parameters:
 *       - in: query
 *         name: success
 *         schema:
 *           type: string
 *         description: Message de succès à afficher (optionnel)
 *     responses:
 *       200:
 *         description: Page d'accueil rendue avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", function (req, res, next) {
	try {
		const success = req.query.success;
		res.render("pages/home", {
			title: "Capitainerie du Port Russel",
			success,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * @swagger
 * /inscription:
 *   get:
 *     summary: Page d'inscription
 *     description: Affiche la page d'inscription
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Page d'inscription rendue avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/inscription", function (req, res, next) {
	try {
		res.render("pages/inscription");
	} catch (err) {
		next(err);
	}
});

//Sous-routers
router.use("/dashboard", dashboardRouter);
router.use("/users", usersRouter);
router.use("/catways", catwaysRouter);
router.use("/catways", reservationsRouter);

module.exports = router;
