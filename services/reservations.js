const mongoose = require("mongoose");
//Importation du modèle de donéees
const Catway = require("../models/catways");
const Booking = require("../models/reservations");

//Récupérer toutes les réservations d'un catway spécifique
exports.getAll = async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json("ID catway invalide");
	}

	try {
		//Récupération du catway
		const catway = await Catway.findById(id);
		if (!catway) {
			return res.status(404).json("Catway non trouvé");
		}

		//Récupération des réservations
		const bookings = await Booking.find({
			catwayNumber: catway.catwayNumber,
		}).sort({ startDate: 1 });

		return res.render("pages/dashboard", {
			catway,
			bookings,
			content: "booking",
			success: req.query.success || null,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

//Récupérer une réservation spécifique
exports.getOne = async (req, res, next) => {
	const { id, idReservation } = req.params;
	const user = res.locals.user;
	const success = req.query.success;

	//Vérification des ObjectID
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

		//Conditions d'autorisation
		const connectedClientName = `${user.firstname} ${user.name}`.trim();
		const canEdit = connectedClientName === booking.clientName.trim();

		if (booking) {
			return res.render("pages/dashboard", {
				user,
				catway,
				booking,
				content: "booking-detail",
				canEdit,
				success,
			});
		}

		return res.status(404).json("Réservation non trouvée");
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

//Ajouter une réservation
exports.createBooking = async (req, res, next) => {
	const { id } = req.params;
	const { boatName, startDate, endDate } = req.body;
	const user = res.locals.user;

	//Vérification des champs
	if (!boatName || !startDate || !endDate) {
		return res.status(400).json("Tous les champs sont obligatoires");
	}

	//Vérification des dates
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (isNaN(start) || isNaN(end)) {
		return res.status(400).json("Format de date invalide");
	}

	if (start >= end) {
		return res.status(400).json("Dates invalides");
	}

	const clientName = `${user.firstname.trim()} ${user.name.trim()}`;

	try {
		//Récupérer le catway
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json("ID catway invalide");
		}

		const catway = await Catway.findById(id);
		if (!catway) {
			return res.status(404).json("Catway non trouvé");
		}

		const catwayNumber = catway.catwayNumber;

		//Vérifier le chevauchement
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

		//Créer la réservation
		await Booking.create({
			catwayNumber,
			clientName: `${user.firstname} ${user.name}`,
			boatName: boatName.trim(),
			startDate: start,
			endDate: end,
		});

		return res
			.status(201)
			.redirect(`/catways/${id}/reservations?success=added`);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

//Modifier une réservation
exports.updateBooking = async (req, res, next) => {
	const { idReservation } = req.params;
	const { boatName, startDate, endDate } = req.body;
	const user = res.locals.user;

	//Vérification des champs
	if (!boatName || !startDate || !endDate) {
		return res.status(400).json("Tous les champs sont obligatoires");
	}

	const start = new Date(startDate);
	const end = new Date(endDate);

	if (isNaN(start) || isNaN(end) || start >= end) {
		return res.status(400).json("Dates invalides");
	}

	try {
		const booking = await Booking.findOne({
			_id: idReservation,
		});

		const temp = {
			boatName: boatName.trim(),
			startDate: start,
			endDate: end,
		};

		if (booking) {
			const connectedClientName = `${user.firstname} ${user.name}`.trim();

			if (booking.clientName.trim() !== connectedClientName) {
				return res.status(403).json("Modification non autorisée");
			}

			Object.keys(temp).forEach((key) => {
				if (!!temp[key]) {
					booking[key] = temp[key];
				}
			});

			await booking.save();

			return res.redirect(
				`/catways/${req.params.id}/reservations/${idReservation}?success=updated`
			);
		}

		return res.status(404).json("Réservation non trouvée");

	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

//Supprimer une réservation
exports.deleteBooking = async (req, res, next) => {
	const { idReservation } = req.params;
    const user = res.locals.user;

	try {
        const booking = await Booking.findById(idReservation);

        if (!booking) {
			return res.status(404).json("Réservation non trouvée");
		}

        const connectedClientName =
			`${user.firstname} ${user.name}`.trim();

		if (booking.clientName.trim() !== connectedClientName) {
			return res.status(403).json("Suppression non autorisée");
		}

		await Booking.deleteOne({
			_id: idReservation
		});

		return res.redirect(`/catways/${req.params.id}/reservations`);

	} catch (error) {
        console.error(error);
		return res.status(500).json(error);
	}
};
