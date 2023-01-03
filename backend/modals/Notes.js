const mongoose = require('mongoose');
const { Schema } = mongoose;
const Notes = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.Now
    }
});
module.exports = mongoose.model('Notes', Notes)