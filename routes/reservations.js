const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

/**
 * @swagger
 * /catways/{number}/reservations:
 *   get:
 *      summary: Récupère toutes les réservations d'un catway spécifique
 *      tags:
 *          - Reservations
 */
router.get('/:number/reservations', service.getAll);

/**
 * @swagger
 * /catways/{number}/reservations/{id}:
 *   get:
 *     summary: Récupère une réservation spécifique d’un catway
 *     tags:
 *       - Reservations
 */
router.get('/:number/reservations/:id', service.getById);

/**
 * @swagger
 * /catways/{number}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation pour un catway
 *     tags:
 *       - Reservations
 */
router.post('/:number/newbooking', service.createBooking);

/**
 * @swagger
 * /catways/{number}/reservations/{id}:
 *   patch:
 *     summary: Modifie une réservation d’un catway
 *     tags:
 *       - Reservations
 */
router.put('/:number/reservations/:id', service.updateBooking);

/**
 * @swagger
 * /catways/{number}/reservations/{id}:
 *   delete:
 *     summary: Annule une réservation
 *     tags:
 *       - Reservations
 */
router.delete('/:number/reservations/:id', service.deleteBooking);

module.exports = router;