const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');
const data = require('../middlewares/data');
const meteo = require('../middlewares/meteo');

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
 *   post:
 *     summary: Se connecter à son compte
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post('/login', service.login);

/**
 * @swagger
 * /logout:
 *    get:
 *      summary: Se déconnecter de son compte
 *      tags: 
 *          - Users
 *      responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.get('/logout', service.logout);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Récupére la liste de tous les utilisateurs
 *      tags:
 *          - Users
 *      responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.getAllUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère un utilisateur par son email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:email', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */
router.post('/', service.createUser);

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     summary: Met à jour un utilisateur existant
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/:email', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.updateUser);


/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:email', private.checkJWT, data.loadUserAndDate, meteo.loadWeatherAndTides, service.deleteUser);


module.exports = router;
