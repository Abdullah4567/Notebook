const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notebook";

const connectToMongo = () => {

    mongoose.connect(mongoURI, { family: 4 }, () => {
        console.log('Connected to Mongo successfully');
    })
}
module.exports = connectToMongo;