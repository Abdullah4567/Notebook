const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.Now
    },
    image: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', User);