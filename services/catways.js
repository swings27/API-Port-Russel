//Importation du modèle de donéees
const Catway = require('../models/catways');

//Récupérer un catway
exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('Catway non trouvé');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//Ajouter un catway
exports.createCatway = async (req, res, next) => {
    const { number, type, state } = req.body;

    //Vérification des champs
    if (!number || !type || !state) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        number,
        type: type.lowerCase().trim(),
        state: state.trim()
    };

    try {
        let catway = await Catway.create(temp);
        return res.status(201).json(catway);
    } catch (error) {
        return res.status(501).json(error)
    }
};

//Modifier un catway
exports.updateCatway = async (req, res, next) => {
    const id = req.params.id;
    const { number, type, state } = req.body;

      //Vérification des champs
    if (!number || !type || !state) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        number,
        type: type.lowerCase().trim(),
        state: state.trim()
    };

    try {
        let catway = await Catway.findOne({_id : id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(200).json(catway);
        }

        return res.status(404).json("Catway non trouvé");
    } catch (error) {
        return res.status(501).json(error);
    }
};

//Supprimer un utilisateur
exports.deleteCatway = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Catway.deleteOne({_id : id});
        return res.status(204).json('Catway supprimé');
    } catch (error) {
        return res.status(501).json(error)
    }
};