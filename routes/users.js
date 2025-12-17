var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', function(req, res, next) {
  res.status(200).send('Voici la liste des utilisateurs');
  next();
});

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère un utilisateur par email
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:email', (req, res) => {
  const email = req.params.email;
  res.status(200).send("Voici l'utilisateur " + email);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/', (req, res) => {
    res.status(201).send('Nouvel utilisateur ajouté !');
});

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     summary: Modifie un utilisateur existant
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de l'utilisateur à modifier
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
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 */
router.put('/:email', (req, res) => {
    res.status(200).send('Utilisateur modifié');
});

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete('/:email', (req, res) => {
    res.send('Utilisateur supprimé');
});

module.exports = router;
