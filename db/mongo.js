const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve('./env/.env')});

const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName : 'API-Port-Russel'
};

const connectDB = async () => {
    console.log('URI MongoDB: ', process.env.URL_Mongo);

    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = connectDB;