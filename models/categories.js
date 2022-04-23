const mongoose = require('../db/db');
const Schema = mongoose.Schema;
 const categoriesSchema = new Schema({
    name: { 
        type: String,
        required: true,  
    },

});

module.exports = mongoose.model('categories', categoriesSchema);