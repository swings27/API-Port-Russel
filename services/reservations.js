//Importation du modèle de donéees
const Booking = require('../models/reservations');

//Récupérer toutes les réservations d'un catway spécifique
exports.getAll = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);

    try {
        let booking = await Booking.findOne({ catwayNumber });

        if (booking) {
            return res.status(200).json(booking);
        }

        return res.status(404).json('Pas de réservation en cours');
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Récupérer une réservation spécifique
exports.getOne = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);
    const idReservation = req.params.idReservation;

    try {
        let booking = await Booking.findOne({
            _id: idReservation,
            catwayNumber
        });

        if (booking) {
            return res.status(200).json(booking);
        }

        return res.status(404).json('Réservation non trouvée');
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Ajouter une réservation
exports.createBooking = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);
    const { clientName, boatName, startDate, endDate } = req.body;

    //Vérification des champs
    if (!clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start) || isNaN(end)) {
        return res.status(400).json('Format de date invalide')
    }

    if (start >= end) {
        return res.status(400).json('Dates invalides');
    }

    const temp = {
        catwayNumber,
        clientName: clientName.trim(),
        boatName: boatName.trim(),
        startDate: start,
        endDate: end
    };

    try {
        const existingBooking = await Booking.findOne({
            catwayNumber,
            startDate: { $lt: end },
            endDate: { $gt: start } 
        });

        if (existingBooking) {
            return res.status(409).json('Une réservation est déjà en cours à cette période');
        }

        let booking = await Booking.create(temp);
        return res.status(201).json(booking);

    } catch (error) {
        return res.status(500).json(error)
    }
};

//Modifier une réservation
exports.updateBooking = async (req, res, next) => {
    const catwayNumber = parseInt(req.params.id);
    const idReservation = req.params.idReservation;
     const { clientName, boatName, startDate, endDate } = req.body;

    //Vérification des champs
    if (!clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        clientName: clientName.trim(),
        boatName: boatName.trim(),
        startDate,
        endDate
    };

    try {
        let booking = await Booking.findOne({
            _id: idReservation, 
            catwayNumber
        });

        if (booking) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    booking[key] = temp[key];
                }
            });

            await booking.save();
            return res.status(200).json(booking);
        }

        return res.status(404).json("Réservation non trouvée");
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Supprimer une réservation
exports.deleteBooking = async (req, res, next) => { 
    const catwayNumber = parseInt(req.params.id)
    const idReservation = req.params.idReservation;

    try {
        await Booking.findOneAndDelete({
            _id: idReservation,
            catwayNumber
        });
        return res.status(204).json('Réservation supprimée');
    } catch (error) {
        return res.status(500).json(error)
    }
};