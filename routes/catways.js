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
router.get('/:id', service.getById);

/**
 * @swagger
 * /catways:
 *   put:
 *     summary: Crée un nouveau catway
 *     tags:
 *       - Catways
 */
router.put('/', service.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Modifie un catway existant
 *     tags:
 *       - Catways
 */
router.patch('/:id', service.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags:
 *       - Catways
 */
router.delete('/:id', service.deleteCatway);

module.exports = router;