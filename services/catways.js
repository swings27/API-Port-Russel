const mongoose = require('mongoose');

//Importation du modèle de donéees
const Catway = require("../models/catways");

// Récupérer tous les catways
exports.getAllCatways = async (req, res, next) => {
	try {
		const catways = await Catway.find().sort({ catwayNumber: 1 });

		res.render("pages/dashboard", {
			catways,
			content: "catways",
			success: req.query.success || null
		});
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

//Récupérer un catway spécifique
exports.getById = async (req, res, next) => {
	const { id } = req.params;
    const success = req.query.success;

	if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("ID Mongo invalide");
    }

	try {
		const catway = await Catway.findById(id);

		if (catway) {
			return res.render('pages/dashboard', {
                catway,
                content: 'catway-detail',
                success
            });
		}

		return res.status(404).json("Catway non trouvé");
	} catch (error) {
		return res.status(500).json(error);
	}
};

//Ajouter un catway
exports.createCatway = async (req, res, next) => {
	const { catwayNumber, catwayType, catwayState } = req.body;
	const catways = await Catway.find();

	//Vérification des champs
	if (!catwayNumber || !catwayType || !catwayState) {
		return res.render("pages/dashboard", {
			catways,
			content: "catways",
			message: "Tous les champs sont obligatoires",
			success: null,
		});
	}

	try {
		const catwayNumberParsed = Number(catwayNumber);

		const existingCatway = await Catway.findOne({
			catwayNumber: catwayNumberParsed,
		});

		if (existingCatway) {
			return res.render("pages/dashboard", {
				catways,
				content: "catways",
				message: `Le catway numéro ${catwayNumberParsed} est déjà utilisé`,
				success: null,
			});
		}

		await Catway.create({
			catwayNumber,
			catwayType,
			catwayState,
		});

		return res.status(201).redirect("/catways?success=added");

	} catch (error) {
		console.error("ERREUR MONGOOSE :", error);
		return res.status(500).json("Erreur serveur");
	}
};

//Modifier un catway
exports.updateCatway = async (req, res, next) => {
	const { id } = req.body ;
	const { catwayState } = req.body;

	//Vérification des champs
	if (!catwayState) {
		return res.status(400).json("Le champ est requis");
	}

	const temp = {
		catwayState: catwayState.trim(),
	};

	try {
		let catway = await Catway.findOne(id);

		if (catway) {
			Object.keys(temp).forEach((key) => {
				if (!!temp[key]) {
					catway[key] = temp[key];
				}
			});

			await catway.save();
			return res.status(200).redirect(`/catways/${catway.id}?success=updated`);
		}

		return res.status(404).json("Catway non trouvé");

	} catch (error) {
		console.error(error);
        return res.status(500).json('Erreur serveur');
	}
};

//Supprimer un catway
exports.deleteCatway = async (req, res, next) => {
	const { id } = req.params;

	try {
		await Catway.findByIdAndDelete(id);

		return res.redirect('/catways');

	} catch (error) {
		console.error(error);
        return res.status(500).json('Erreur serveur');
	}
};
