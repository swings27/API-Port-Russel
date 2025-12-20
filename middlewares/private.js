const jwt = require('jsonwebtoken');

exports.checkJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json('Token manquant');
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json('Token invalide');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // On stocke les infos utiles pour les prochaines routes
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json('Token expiré ou invalide');
    }
};