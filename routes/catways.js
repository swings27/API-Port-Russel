const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');
const data = require('../middlewares/data');
const meteo = require("../middlewares/meteo");

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: >
 *     Gestion des catways.
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page dashboard avec tous les catways
 *       500:
 *         description: Erreur serveur
 */
router.get('/', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.getAllCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son identifiant
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Page dashboard avec le détail du catway
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.getById);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Champs obligatoires manquants
 *       409:
 *         description: Numéro de catway déjà utilisé
 *       500:
 *         description: Erreur serveur
 */
router.post('/', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie un catway existant
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayState
 *             properties:
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       400:
 *         description: Champs manquants ou ID invalide
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway à supprimer
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.deleteCatway);

module.exports = router;