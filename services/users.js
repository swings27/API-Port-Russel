//Importation du modèle de donéees
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    try {
        let user = await User.find();

        if (user) {
            return res.status(200).json(user)
        }
        
        return res.status(404).json('Listing introuvable');
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Récupérer un utilisateur spécifique
exports.getUser = async (req, res, next) => {
    const email = req.params.email

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('Utilisateur non trouvé');
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Ajouter un utilisateur
exports.createUser = async (req, res, next) => {
    const { name, firstname, email, password } = req.body;

    //Vérification des champs
    if (!name || !firstname || !email || !password) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        name: name.trim(),
        firstname: firstname.trim(),
        email: email.toLowerCase().trim(),
        password
    };

    try {
        let user = await User.create(temp);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Modifier un utilisateur
exports.updateUser = async (req, res, next) => {
    const userEmail = req.params.email;
    const { name, firstname, email, password } = req.body;

      //Vérification des champs
    if (!name || !firstname || !email || !password) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        name: name.trim(),
        firstname: firstname.trim(),
        email: email.toLowerCase().trim(),
        password
    };

    try {
        let user = await User.findOne({ email : userEmail });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(200).json(user);
        }

        return res.status(404).json("Utilisateur non trouvé");
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
    const email = req.params.email

    try {
        await User.deleteOne(email);
        return res.status(204).json('Utilisateur supprimé');
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Authentification
exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Email et mot de passe obligatoires')
    }

    try {
        const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt');
       if (!user) {
            return res.status(404).json('Utilisateur non trouvé');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json('Mot de passe invalide');
        }

        const payload = {
            userId: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '15m'
        });

        return res.status(200).json({
            message: 'Authentification réussie',
            token
        });
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Se déconnecter
exports.logout = async (req, res, next) => {
    return res.status(200).json('Déconnexion réussie');
};

