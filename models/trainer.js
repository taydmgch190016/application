const mongoose = require('../db/db');

const trainerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: '/img/userDefault.png'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },       
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true  
    },
    classes:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "class"
        }
    ],
})

module.exports = mongoose.model('trainer', trainerSchema);