const express = require('express');
const router = express.Router();
const User = require('../models/users');

const private = require('../middlewares/private');

router.get('/', private.checkJWT, async (req, res) => {

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.redirect('/');
        }
        const now = new Date();

        res.render('pages/dashboard', {
            user,
            date: now.toLocaleDateString('fr-FR')
        });
    } catch (error) {
        console.error('Erreur dashboard:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;