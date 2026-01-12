var express = require('express');
var router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');
const data = require('../middlewares/data');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: >
 *     Gestion des utilisateurs.
 *     ⚠️ Note technique : les routes statiques (ex: /users/logout)
 *     doivent être déclarées avant les routes dynamiques (ex: /users/{email})
 *     afin d'éviter les conflits de routage dans Express.
 */

/**
 * @swagger
 * /login:
 *    post:
 *      summary: Se connecter à son compte
 *      tags:
 *          - Users
 */
router.post('/login', service.login);

/**
 * @swagger
 * /logout:
 *    get:
 *      summary: Se déconnecter de son compte
 *      tags: 
 *          - Users
 */
router.get('/logout', service.logout);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Récupére la liste de tous les utilisateurs
 *      tags:
 *          - Users
 */
router.get('/', private.checkJWT, data.loadUserAndDate, service.getAllUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère un utilisateur par son id
 *     tags:
 *       - Users
 */
router.get('/:email', private.checkJWT, data.loadUserAndDate, service.getUser);

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
router.put('/:email', private.checkJWT, data.loadUserAndDate, service.updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Users
 */
router.delete('/:id', private.checkJWT, data.loadUserAndDate, service.deleteUser);


module.exports = router;
