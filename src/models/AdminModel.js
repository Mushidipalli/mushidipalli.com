const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
      type:Number,
      require:true,
      unique:true
    },
    password : {
        type : String,
        require : true
    }
   

}, {
    timestamps: true
});



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;