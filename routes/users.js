var express = require('express');
var router = express.Router();

const service = require('../services/users');

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Récupére la liste de tous les utilisateurs
 *      tags:
 *          - Users
 */
router.get('/', service.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son id
 *     tags:
 *       - Users
 */
router.get('/:email', service.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 */
router.post('/', service.createUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Modifier un utilisateur existant
 *     tags:
 *       - Users
 */
router.put('/:email', service.updateUser);

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
