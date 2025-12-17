const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère toutes les réservations d’un catway
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des réservations du catway
 */
router.get('/catways/:id/reservations', (req, res) => {
    const id = req.params.id;
    res.status(200).send('Voici les réservations pour le catway ' + id);
});

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère une réservation spécifique d’un catway
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description: Identifiant de la réservation
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation non trouvée
 */
router.get('/catways/:id/reservations/:idReservation', (req, res) => {
    const id = req.params.id;
    res.status(200).send('Voici la réservation ' + id);
});

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation pour un catway
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateDebut:
 *                 type: string
 *                 format: date
 *               dateFin:
 *                 type: string
 *                 format: date
 *               bateau:
 *                 type: string
 *     responses:
 *       201:
 *         description: Réservation créée
 */
router.post('/catways/:id/reservations/', (req, res) => {
    res.status(201).send('Nouvelle réservation effectuée !');
});

/**
 * @swagger
 * /catways/{id}/reservations:
 *   put:
 *     summary: Modifie une réservation d’un catway
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateDebut:
 *                 type: string
 *                 format: date
 *               dateFin:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Réservation modifiée
 */
router.put('/catways/:id/reservations', (req, res) => {
    res.status(200).send('Réservation modifiée');
});

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Annule une réservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         description: Identifiant de la réservation
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation annulée
 */
router.delete('/catways/:id/reservations/:idReservation', (req, res) => {
    res.send('Réservation annulée');
});

module.exports = router;