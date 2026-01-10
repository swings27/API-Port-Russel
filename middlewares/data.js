//Récupérer les données requises à chaque changement de vue
const User = require('../models/users');

exports.loadUser = async (req, res, next) => {
    if (!req.userId) return res.redirect('/');

    res.locals.user = await User.findById(req.userId);
    res.locals.date = new Date().toLocaleDateString('fr-FR');
    next();
};