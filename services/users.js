//Importation du modèle de donéees
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.render('pages/dashboard', {
            users,
            content: 'users'
        })

    } catch (error) {
        return res.status(500).json(error);
    }
};

//Récupérer un utilisateur spécifique
exports.getUser = async (req, res, next) => {
    const email = req.params.email

    try {
        const profileUser = await User.findOne({ email });
        const success = req.query.success;

        if (profileUser) {
            return res.render('pages/dashboard', {
                profileUser,
                content: 'profile',
                success
            });
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

    //Vérification si utilisateur déjà existant
    const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('pages/inscription', {
                message: 'Cet email est déjà utilisé.'
            });
        }

    const temp = {
        name: name.trim(),
        firstname: firstname.trim(),
        email: email.toLowerCase().trim(),
        password
    };

    try {
        await User.create(temp);
        return res.redirect('/?success=registered');

    } catch (error) {
        return res.status(500).render('pages/inscription', {
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

//Modifier un utilisateur
exports.updateUser = async (req, res, next) => {
    const userEmail = req.params.email;
    const { email, password } = req.body;

      //Vérification des champs
    if (!email || !password) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        email: email.toLowerCase().trim(),
        password
    };

    try {
        const connectedUser = res.locals.user;
       
        if (connectedUser.email !== userEmail) {
            return res.status(403).json('Modification non autorisée');
        }

        const user = await User.findOne({ email : userEmail });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(200).redirect(`/users/${user.email}?success=registered`);
        }

        return res.status(404).json("Utilisateur non trouvé");
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
    const userEmail = req.params.email;

    try {
        const connectedUser = res.locals.user;

        if (connectedUser.email !== userEmail) {
            return res.status(403).json('Suppression non autorisée');
        }

        await User.deleteOne(userEmail);
        return res.status(204).redirect('/');
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Authentification
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        return res.status(400).json('Email et mot de passe obligatoires')
    }

    try {
        const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt');
       if (!user) {
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/');
        }

        const payload = {
            userId: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
        });

        res.redirect('/dashboard');
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Se déconnecter
exports.logout = async (req, res, next) => {
    console.log('LOGOUT appelé')
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    
    return res.redirect('/');
};

