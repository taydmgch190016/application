const mongoose = require('../db/db');

const classSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true
    },
    course:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses"
        }
    ],
    trainee:
    [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "trainee"
        }
    ]
});

module.exports = mongoose.model('class', classSchema);