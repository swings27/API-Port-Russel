const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

/**
 * /catways:
 *  get:
 *      summary: Récupère tous les catways
 *      tags:
 *          - Catways
 */
router.get('/', private.checkJWT, service.getAllCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son identifiant
 *     tags:
 *       - Catways
 */
router.get('/:id', private.checkJWT, service.getByNumber);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags:
 *       - Catways
 */
router.post('/', private.checkJWT, service.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie un catway existant
 *     tags:
 *       - Catways
 */
router.put('/:id', private.checkJWT, service.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags:
 *       - Catways
 */
router.delete('/:id', private.checkJWT, service.deleteCatway);

module.exports = router;