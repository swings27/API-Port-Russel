const jwt = require('jsonwebtoken');

exports.checkJWT = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
    return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.redirect('/');
    }
};