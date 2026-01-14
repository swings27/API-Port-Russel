const mongoose = require("mongoose");
const Catway = require("../models/catways");

/**
 * Récupère tous les catways
 */
exports.getAllCatways = async (req, res, next) => {
	try {
		//Récupération de tous les catways triés par numéro
		const catways = await Catway.find().sort({ catwayNumber: 1 });

		res.render("pages/dashboard", {
			catways,
			content: "catways",
			success: req.query.success || null,
		});
	} catch (error) {
		console.error("Erreur récupération des catways :", error);
		res.status(500).json(error);
	}
};

/**
 * Récupère un catway spécifique par son ID
 */
exports.getById = async (req, res, next) => {
	const { id } = req.params;
	const success = req.query.success;

	// Vérification de la validité de l'ID Mongo
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json("ID Mongo invalide");
	}

	try {
		const catway = await Catway.findById(id);

		if (catway) {
			return res.render("pages/dashboard", {
				catway,
				content: "catway-detail",
				success,
			});
		}

		return res.status(404).json("Catway non trouvé");
	} catch (error) {
		console.error("Erreur récupération catway :", error);
		return res.status(500).json(error);
	}
};

/**
 * Créer un nouveau catway
 */
exports.createCatway = async (req, res, next) => {
	const { catwayNumber, catwayType, catwayState } = req.body;
	const catways = await Catway.find();

	//Vérification des champs obligatoires
	if (!catwayNumber || !catwayType || !catwayState) {
		return res.render("pages/dashboard", {
			catways,
			content: "catways",
			message: "Tous les champs sont obligatoires",
			success: null,
		});
	}

	const catwayNumberParsed = Number(catwayNumber);
	if (isNaN(catwayNumberParsed) || catwayNumberParsed <= 0) {
		return res.render("pages/dashboard", {
			catways,
			content: "catways",
			message: "Numéro de catway invalide",
			success: null,
		});
	}

	try {
		// Vérifier qu'aucun catway avec ce numéro existe
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

		// Création d'un catway
		await Catway.create({
			catwayNumber: catwayNumberParsed,
			catwayType,
			catwayState,
		});

		return res.status(201).redirect("/catways?success=added");
	} catch (error) {
		console.error("Erreur création catway :", error);
		return res.status(500).json(error);
	}
};

/**
 * Modifie l'état d'un catway existant
 */
exports.updateCatway = async (req, res, next) => {
	const { id } = req.params;
	const { catwayState } = req.body;

	// Vérification de l'ID et du champ
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("ID Mongo invalide");
    }
	if (!catwayState) {
		return res.status(400).json("Le champ est requis");
	}

	try {
		const catway = await Catway.findById(id);

		if (!catway) {
			return res.status(404).json("Catway non trouvé");
		}

		// Mise à jour de l'état
		catway.catwayState = catwayState.trim();
		await catway.save();
		
		return res.status(200).redirect(`/catways/${catway.id}?success=updated`);

	} catch (error) {
		console.error("Erreur mise à jour catway :", error);
		return res.status(500).json(error);
	}
};

/**
 * Supprime un catway
 */
exports.deleteCatway = async (req, res, next) => {
	const { id } = req.params;
	
	// Vérification de l'ID
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("ID Mongo invalide");
    }

	try {
		await Catway.findByIdAndDelete(id);

		return res.redirect("/catways");
	} catch (error) {
		console.error("Erreur suppression catway :", error);
		return res.status(500).json(error);
	}
};
