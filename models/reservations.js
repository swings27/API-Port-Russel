const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    catwayNumber: {
        type: Number,
        unique: true,
        required: true,
        min: [1, 'Le numéro dit être supérieur à 0']
    },
    clientName: {
        type: String,
        required: [true, 'Le prénom et le nom sont requis'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    boatName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    startDate: {
        type: Date,
        required: true
    },
     endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'La date de fin doit être postérieure à la date de début'
        }
    }
}, {
    timestamps: true
});

ReservationSchema.pre('save', async function (next) {
    const Reservation = mongoose.model('Reservation');

    const overlap = await Reservation.findOne({
        catwayNumber: this.catwayNumber,
        startDate: { $lt: this.endDate },
        endDate: { $gt: this.startDate }
    });

    if (overlap) {
        return next(
            new Error('Ce catway est déjà réservé sur cette période')
        );
    }
    next();
});

module.exports = mongoose.model('Reservation', ReservationSchema);