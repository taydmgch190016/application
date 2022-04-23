const mongoose = require('../db/db');
var mongoosePaginate = require('mongoose-paginate');
const staffSchema = new mongoose.Schema({
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
    }
})

staffSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('staff', staffSchema);