const mongoose = require('mongoose');
try {
    const client = mongoose.connect('mongodb+srv://arsper:lehoanganh21@cluster0.2dc4f.mongodb.net/Group3', {
        useNewUrlParser: true,
        // useFindAndModify: true
    })
    console.log("connected")
} catch (e) {
    console.log(e)
}

module.exports = mongoose;