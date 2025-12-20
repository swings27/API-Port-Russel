//Importation du modèle de donéees
const Booking = require('../models/reservations');

//Récupérer une réservation spécifique
exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        let booking = await Booking.findById(id);

        if (booking) {
            return res.status(200).json(booking);
        }

        return res.status(404).json('Réservation non trouvée');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//Récupérer toutes les réservations d'un catway spécifique
exports.getAll = async (req, res, next) => {
    const catwayNumber = req.params.number;

    try {
        let booking = await Booking.findOne({ catwayNumber });

        if (booking) {
            return res.status(200).json(booking);
        }

        return res.status(404).json('Listing introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

//Ajouter une réservation
exports.createBooking = async (req, res, next) => {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    //Vérification des champs
    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        catwayNumber,
        clientName: clientName.trim(),
        boatName: boatName.trim(),
        startDate,
        endDate
    };

    try {
        let booking = await Booking.create(temp);
        return res.status(201).json(booking);
    } catch (error) {
        return res.status(501).json(error)
    }
};

//Modifier un catway
exports.updateBooking = async (req, res, next) => {
     const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    //Vérification des champs
    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json('Tous les champs sont obligatoires')
    }

    const temp = {
        catwayNumber,
        clientName: clientName.trim(),
        boatName: boatName.trim(),
        startDate,
        endDate
    };

    try {
        let booking = await Booking.findById({_id : id });

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
        return res.status(501).json(error);
    }
};

//Supprimer un utilisateur
exports.deleteBooking = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Booking.deleteOne({_id : id});
        return res.status(204).json('Réservation supprimée');
    } catch (error) {
        return res.status(501).json(error)
    }
};