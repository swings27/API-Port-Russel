const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema ({
    catwayNumber: {
        type : Number,
        required : [true, 'Le numéro est requis'],
        unique : true
    },
    catwayType: {
        type : String,
        trim : true,
        required : [true, 'Le catway est-il court ou long ?'],
        lowercase : true
    },
    catwayState: {
        type : String,
        trim : true,
        required : [true, 'Dans quel état est le catway ?'],
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Catway', Catway);