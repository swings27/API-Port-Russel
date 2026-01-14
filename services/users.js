//Importation des dépendances
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Récupère tous les utilisateurs
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Récupère tous les utilisateurs

        res.render('pages/dashboard', {
            users,
            content: 'users'
        })

    } catch (error) {
        console.error("Erreur de récupération des utilisateurs", error);
        return res.status(500).json(error);
    }
};

/**
 * Récupère un utilisateur par son email
 */
exports.getUser = async (req, res, next) => {
    const email = decodeURIComponent(req.params.email);

    try {
        const profileUser = await User.findOne({ email });
        const success = req.query.success;

        if (!profileUser) {
            return res.status(404).json('Utilisateur non trouvé');
        }

        return res.render('pages/dashboard', {
                profileUser,
                content: 'profile',
                success
            });

    } catch (error) {
        console.error("Erreur de récupération de l'utilisateur :", error);
        return res.status(500).json(error);
    }
};

/**
 * Créer un nouvel utilisateur
 */
exports.createUser = async (req, res, next) => {
    const { name, firstname, email, password } = req.body;

    //Vérification des champs
    if (!name || !firstname || !email || !password) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    //Vérification si utilisateur déjà existant
    const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('pages/inscription', {
                message: 'Cet email est déjà utilisé.'
            });
        }

    try {
    const newUser = {
        name: name.trim(),
        firstname: firstname.trim(),
        email: email.toLowerCase().trim(),
        password
    };

    await User.create(newUser);
    return res.redirect('/?success=registered');

    } catch (error) {
        return res.status(500).render('pages/inscription', {
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

/**
 * Mettre à jour un utilisateur existant
 */
exports.updateUser = async (req, res, next) => {
    const userEmail = decodeURIComponent(req.params.email);
    const { email, password } = req.body;

    //Vérification des champs
    if (!email || !password) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    try {
       // Vérifier que l'utilisateur connecté est celui modifié
        if (res.locals.user.email !== userEmail) {
            return res.status(403).json('Modification non autorisée');
        }

        const user = await User.findOne({ email : userEmail });

        if (!user) {
            return res.status(404).json("Utilisateur non trouvé");
        };

        //Met à jour uniquement les champs fournis
        user.email = email.toLowerCase().trim();
        user.password = password;
        await user.save();

        return res.status(200).redirect(`/users/${user.email}?success=updated`);

    } catch (error) {
        console.error("Erreur de modification de l'utilisateur :", error);
        return res.status(500).json(error);
    }
};

/**
 * Supprime un utilisateur
 */
exports.deleteUser = async (req, res, next) => {
    const userEmail = decodeURIComponent(req.params.email);

    try {
        // vérifier que l'utilisateur supprimé est celui connecté
        if (res.locals.user.email !== userEmail) {
            return res.status(403).json('Suppression non autorisée');
        }

        await User.deleteOne({ email: userEmail });
        return res.redirect('/');

    } catch (error) {
        console.error("Erreur de suppression de l'utilisateur :", error);
        return res.status(500).json('Erreur serveur');
    }
};

/**
 * Authentification d'un utilisateur
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Email et mot de passe obligatoires')
    }

    try {
        const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt');
       if (!user) {
            return res.redirect('/');
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/');
        }

        // Création du JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        // Stocke le JWT dans un cookie sécurisé
        res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
        });

        res.redirect('/dashboard');
        
    } catch (error) {
        console.error("Echec de l'authentification :", error);
        return res.status(500).json(error);
    }
};

/**
 * Déconnexion de l'utilisateur et suppression du cookie JWT
 */
exports.logout = async (req, res, next) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });
    
    return res.redirect('/');
};

