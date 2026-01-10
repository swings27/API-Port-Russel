//Importation du modèle de donéees
const Catway = require('../models/catways');

// Récupérer tous les catways
exports.getAllCatways = async (req, res, next) => {
    try {
        const catways = await Catway.find();

        res.render('pages/dashboard', {
            catways,
            content: 'catways'
        });

    } catch (error) {
        console.error('Erreur getAllCatways :', error);
        res.status(500).json(error);
    }
};

//Récupérer un catway spécifique
exports.getByNumber = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);

    if (isNaN(catwayNumber)) {
        return res.status(400).json('Numéro de catway invalide');
    }

    try {
        const catway = await Catway.findOne({ catwayNumber });

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('Catway non trouvé');
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Ajouter un catway
exports.createCatway = async (req, res, next) => {
    const { catwayNumber, catwayType, catwayState } = req.body;

    //Vérification des champs
    if (!catwayNumber || !catwayType || !catwayState) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    try {
        const existingCatway = await Catway.findOne({ catwayNumber });
        if (existingCatway) {
            return res.status(409).json('Le catway numéro ' + catwayNumber +' est déjà utilisé');
        }

        let catway = await Catway.create({
            catwayNumber,
            catwayType,
            catwayState
        });

        return res.status(201).json(catway);
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Modifier un catway
exports.updateCatway = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);
    const { catwayType, catwayState } = req.body;

      //Vérification des champs
    if (!catwayType && !catwayState) {
        return res.status(400).json('Un champ est requis')
    }

    const temp = {
        catwayType: catwayType.trim(),
        catwayState: catwayState.trim()
    };

    try {
        let catway = await Catway.findOne({ catwayNumber });

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
        return res.status(500).json(error);
    }
};

//Supprimer un catway
exports.deleteCatway = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);

    try {
        await Catway.deleteOne({ catwayNumber });
        return res.status(204).json('Catway supprimé');
    } catch (error) {
        return res.status(500).json(error)
    }
};