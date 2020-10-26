const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const PostSchema = new Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,

    },
    image: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema);