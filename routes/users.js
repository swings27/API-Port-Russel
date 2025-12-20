var express = require('express');
var router = express.Router();

const service = require('../services/users');
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son id
 *     tags:
 *       - Users
 */
router.get('/:id', service.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 */
router.post('/new', service.createUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Modifier un utilisateur existant
 *     tags:
 *       - Users
 */
router.patch('/:id', service.updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Users
 */
router.delete('/:id', service.deleteUser);

module.exports = router;
