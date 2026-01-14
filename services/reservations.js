const mongoose = require("mongoose");
//Importation du modèle de donéees
const Catway = require("../models/catways");
const Booking = require("../models/reservations");

/**
 * Récupère toutes les réservations d'un catway spécifique
 */
exports.getAll = async (req, res, next) => {
	const { id } = req.params;

	//Vérifier que l'ID est valide
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json("ID catway invalide");
	}

	try {
		//Récupérer le catway
		const catway = await Catway.findById(id);
		if (!catway) {
			return res.status(404).json("Catway non trouvé");
		}

		//Récupérer toutes les réservations liées à ce catway
		const bookings = await Booking.find({
			catwayNumber: catway.catwayNumber,
		})
			.sort({ startDate: 1 })
			.lean();

		const bookingsSafe = bookings.map((b) => ({
			...b,
			startDate: b.startDate ? new Date(b.startDate) : null,
			endDate: b.endDate ? new Date(b.endDate) : null,
		}));

		return res.render("pages/dashboard", {
			catway,
			bookings: bookingsSafe,
			content: "booking",
			success: req.query.success || null,
		});
	} catch (error) {
		console.log("Erreur récupération des réservations:", error);
		return res.status(500).json(error);
	}
};

/**
 * Récupère une réservation spécifique
 */
exports.getOne = async (req, res, next) => {
	const { id, idReservation } = req.params;
	const success = req.query.success;

	//Vérification des ID
	if (
		!mongoose.Types.ObjectId.isValid(id) ||
		!mongoose.Types.ObjectId.isValid(idReservation)
	) {
		return res.status(400).json("ID invalide");
	}

	try {
		//Récupérer le catway
		const catway = await Catway.findById(id);
		if (!catway) {
			return res.status(404).json("Catway non trouvé");
		}

		//Récupérer la réservation
		const booking = await Booking.findOne({
			_id: idReservation,
			catwayNumber: catway.catwayNumber,
		});
		if (!booking) {
			return res.status(404).json("Réservation non trouvée");
		}

		// Vérifier si l'utilisateur connecté peut modifier cette réservation
		const connectedClientName =
			`${res.locals.user.firstname} ${res.locals.user.name}`.trim();
		const canEdit = connectedClientName === booking.clientName.trim();

		return res.render("pages/dashboard", {
			catway,
			booking,
			content: "booking-detail",
			canEdit,
			success,
		});
	} catch (error) {
		console.error("Erreur récupération réservation :", error);
		return res.status(500).json(error);
	}
};

/**
 * Créer une nouvelle réservation
 */
exports.createBooking = async (req, res, next) => {
	const { id } = req.params;
	const { boatName, startDate, endDate } = req.body;

	//Vérification des champs obligatoires
	if (!boatName || !startDate || !endDate) {
		return res.status(400).json("Tous les champs sont obligatoires");
	}

	//Vérification des dates et de leur logique
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (isNaN(start) || isNaN(end)) {
		return res.status(400).json("Format de date invalide");
	}
	if (start >= end) {
		return res.status(400).json("Dates invalides");
	}

	const clientName = `${res.locals.user.firstname.trim()} ${res.locals.user.name.trim()}`;

	try {
		//Vérifier que le catway existe
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json("ID catway invalide");
		}
		const catway = await Catway.findById(id);
		if (!catway) {
			return res.status(404).json("Catway non trouvé");
		}

		const catwayNumber = catway.catwayNumber;

		//Vérifier le chevauchement des dates
		const existingBooking = await Booking.findOne({
			catwayNumber,
			startDate: { $lt: end },
			endDate: { $gt: start },
			clientName,
		});

		if (existingBooking) {
			return res
				.status(409)
				.json("Une réservation est déjà en cours à cette période");
		}

		//Création de la réservation
		await Booking.create({
			catwayNumber,
			clientName: `${res.locals.user.firstname} ${res.locals.user.name}`,
			boatName: boatName.trim(),
			startDate: start,
			endDate: end,
		});

		return res
			.status(201)
			.redirect(`/catways/${id}/reservations?success=added`);
	} catch (error) {
		console.error("Erreur création réservation :", error);
		return res.status(500).json(error);
	}
};

/**
 * Modifier une réservation existante
 */
exports.updateBooking = async (req, res, next) => {
	const { id, idReservation } = req.params;
	const { boatName, startDate, endDate } = req.body;

	//Vérification des champs
	if (!boatName || !startDate || !endDate) {
		return res.status(400).json("Tous les champs sont obligatoires");
	}

	// Vérification des dates et leur logique
	const start = new Date(startDate);
	const end = new Date(endDate);
	if (isNaN(start) || isNaN(end) || start >= end) {
		return res.status(400).json("Dates invalides");
	}

	try {
		const booking = await Booking.findById(idReservation);
		if (!booking) return res.status(404).json("Réservation non trouvée");

		const connectedClientName =
			`${res.locals.user.firstname} ${res.locals.user.name}`.trim();

		// Vérifier que l'utilisateur connecté est bien le client
		if (booking.clientName.trim() !== connectedClientName) {
			return res.status(403).json("Modification non autorisée");
		}

		// Mise à jour des champs
		booking.boatName = boatName.trim();
		booking.startDate = start;
		booking.endDate = end;

		await booking.save();

		return res.redirect(
			`/catways/${req.params.id}/reservations/${idReservation}?success=updated`
		);
	} catch (error) {
		console.error("Erreur modification réservation :", error);
		return res.status(500).json(error);
	}
};

/**
 * Supprimer une réservation
 */

exports.deleteBooking = async (req, res, next) => {
	const { id, idReservation } = req.params;

	try {
		const booking = await Booking.findById(idReservation);
		if (!booking) {
			return res.status(404).json("Réservation non trouvée");
		}

		const connectedClientName =
			`${res.locals.user.firstname} ${res.locals.user.name}`.trim();

		// vérifier que l'utilisateur connecté est bien le client
		if (booking.clientName.trim() !== connectedClientName) {
			return res.status(403).json("Suppression non autorisée");
		}

		await Booking.deleteOne({
			_id: idReservation,
		});

		return res.redirect(`/catways/${req.params.id}/reservations`);
	} catch (error) {
		console.error("Erreur suppression réservation :", error);
		return res.status(500).json(error);
	}
};
