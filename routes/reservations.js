const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private');
const data = require('../middlewares/data');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: >
 *     Gestion des réservations via les catways.
 */

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère toutes les réservations d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Liste des réservations du catway
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/reservations', private.checkJWT, data.loadUserAndDate, service.getAll);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère une réservation spécifique d’un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Détail de la réservation
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/reservations/:idReservation', private.checkJWT, data.loadUserAndDate, service.getOne);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation pour un catway
 *     tags: [Reservations]
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
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Chevauchement de réservation
 *       500:
 *         description: Erreur serveur
 */
router.post('/:id/reservations', private.checkJWT, data.loadUserAndDate, service.createBooking);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifie une réservation existante
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *       403:
 *         description: Modification non autorisée
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/reservations/:idReservation', private.checkJWT, data.loadUserAndDate, service.updateBooking);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       403:
 *         description: Suppression non autorisée
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id/reservations/:idReservation', private.checkJWT, data.loadUserAndDate, service.deleteBooking);

module.exports = router;