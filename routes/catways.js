const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère la liste des catways
 *     tags:
 *       - Catways
 *     responses:
 *       200:
 *         description: Liste des catways
 */
router.get('/', (req, res) => {
    res.status(200).send('Voici les catways');
});

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son identifiant
 *     tags:
 *       - Catways
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway non trouvé
 */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).send('Voici le catway ' + id);
});

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags:
 *       - Catways
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *               etat:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catway créé
 */
router.post('/', (req, res) => {
    res.status(201).send('Nouveau catway ajouté !');
});

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie un catway existant
 *     tags:
 *       - Catways
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway à modifier
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etat:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway modifié
 */
router.put('/:id', (req, res) => {
    res.status(200).send('Catway modifié');
});

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags:
 *       - Catways
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du catway à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catway supprimé
 */
router.delete('/:id', (req, res) => {
    res.send('Catway supprimé');
});

module.exports = router;