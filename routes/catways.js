const express = require('express');
const router = express.Router();

const service = require('../services/catways');

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son identifiant
 *     tags:
 *       - Catways
 */
router.get('/:number', service.getByNumber);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags:
 *       - Catways
 */
router.post('/', service.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Modifie un catway existant
 *     tags:
 *       - Catways
 */
router.patch('/:number', service.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags:
 *       - Catways
 */
router.delete('/:number', service.deleteCatway);

module.exports = router;