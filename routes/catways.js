const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');
const data = require('../middlewares/data');

/**
 * /catways:
 *  get:
 *      summary: Récupère tous les catways
 *      tags:
 *          - Catways
 */
router.get('/', private.checkJWT, data.loadUser, service.getAllCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son identifiant
 *     tags:
 *       - Catways
 */
router.get('/:id', private.checkJWT, data.loadUser, service.getByNumber);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags:
 *       - Catways
 */
router.post('/', private.checkJWT, data.loadUser, service.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie un catway existant
 *     tags:
 *       - Catways
 */
router.put('/:id', private.checkJWT, data.loadUser, service.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags:
 *       - Catways
 */
router.delete('/:id', private.checkJWT, data.loadUser, service.deleteCatway);

module.exports = router;