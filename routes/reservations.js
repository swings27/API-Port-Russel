const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private');
const data = require('../middlewares/data');

/**
 * @swagger
 * /catways/{number}/reservations:
 *   get:
 *      summary: Récupère toutes les réservations d'un catway spécifique
 *      tags:
 *          - Reservations
 */
router.get('/:id/reservations', private.checkJWT, data.loadUserAndDate, service.getAll);

/**
 * @swagger
 * /catways/{number}/reservations/{id}:
 *   get:
 *     summary: Récupère une réservation spécifique d’un catway
 *     tags:
 *       - Reservations
 */
router.get('/:id/reservations/:idReservation', private.checkJWT, data.loadUserAndDate, service.getOne);

/**
 * @swagger
 * /catways/{number}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation pour un catway
 *     tags:
 *       - Reservations
 */
router.post('/:id/reservations', private.checkJWT, data.loadUserAndDate, service.createBooking);

/**
 * @swagger
 * /catways/{number}/reservations/{id}:
 *   put:
 *     summary: Modifie une réservation d’un catway
 *     tags:
 *       - Reservations
 */
router.put('/:id/reservations/:idReservation', private.checkJWT, data.loadUserAndDate, service.updateBooking);

/**
 * @swagger
 * /catways/{number}/reservations/{id}:
 *   delete:
 *     summary: Annule une réservation
 *     tags:
 *       - Reservations
 */
router.delete('/:id/reservations/:idReservation', private.checkJWT, data.loadUserAndDate, service.deleteBooking);

module.exports = router;