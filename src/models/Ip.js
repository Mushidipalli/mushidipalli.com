const mongoose = require('mongoose');
const ipSchema = new mongoose.Schema({
   
    ip: {
        type: String,
        required: true,
        unique: true
    }
   

});



const Ip = mongoose.model('Ip', ipSchema);

module.exports = Ip;