var express = require('express');
var router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Récupére la liste de tous les utilisateurs
 *      tags:
 *          - Users
 */
router.get('/', private.checkJWT, service.getAllUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère un utilisateur par son id
 *     tags:
 *       - Users
 */
router.get('/:email', private.checkJWT, service.getUser);

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
 * /users/{email}:
 *   put:
 *     summary: Modifier un utilisateur existant
 *     tags:
 *       - Users
 */
router.put('/:email', private.checkJWT, service.updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Users
 */
router.delete('/:id', private.checkJWT, service.deleteUser);

//Authentification

/**
 * @swagger
 * /login
 *  post:
 *      summary: Se connecter à son compte
 *      tags:
 *          - Users
 */
router.post('/login', service.authenticate);

/**
 * @swagger
 * /logout
 *  get:
 *      summary: Se déconnecter de son compte
 *      tags: 
 *          - Users
 */
router.get('/logout');

module.exports = router;
