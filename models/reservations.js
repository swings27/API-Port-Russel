const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    catwayNumber: {
        type : Number,
        required : [true, 'Le numéro est requis'],
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

module.exports = mongoose.model('Reservation', ReservationSchema);