const mongoose = require('../db/db');

const accSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },       
    role: {
        type: String,
        required: true
    }
    
})
module.exports = mongoose.model('users', accSchema);