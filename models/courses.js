const mongoose = require('../db/db');
var categoriesSchema =  require('./categories').schema;
const courseSchema = new mongoose.Schema({
    code:{
        type: Number,
        required:true,
        unique: true
    },
    name: { 
        type: String,
        required: true,
    },
    category:      
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories"
        } 
    ,
    trainer:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "trainer"
        }
    ,
    description:{
        type: String,
        required: false
    },
});

module.exports = mongoose.model('courses', courseSchema);