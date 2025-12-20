//Importation du modèle de donéees
const User = require('../models/users');

//Récupérer un utilisateur
exports.getUserById = async (req, res, next) => {
    const id = req.params.id

    try {
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('Utilisateur non trouvé');
    } catch (error) {
        return res.status(501).json(error);
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
        return res.status(501).json(error)
    }
};

//Modifier un utilisateur
exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
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
        let user = await User.findOne({_id : id});

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
        return res.status(501).json(error);
    }
};

//Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        await User.deleteOne({_id : id});
        return res.status(204).json('Utilisateur supprimé');
    } catch (error) {
        return res.status(501).json(error)
    }
};

