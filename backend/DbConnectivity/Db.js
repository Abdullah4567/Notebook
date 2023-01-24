const mongoose = require('mongoose');
const { dbName, dbUrl } = require('../config');
const mongoURI = dbUrl + dbName;

const connectToMongo = () => {

    mongoose.connect(mongoURI, { family: 4 }, () => {
        console.log('Connected to Mongo successfully');
    })
}
module.exports = connectToMongo;