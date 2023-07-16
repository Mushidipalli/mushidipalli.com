
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   
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
    gender : {
        type : String,
        require: true

    },
    designation : {
        type : String,
        require: true

    },
    permanentAddress : {
        type:String,
        require:true

    },
    currentAddress : {
        type:String,
        require:true

    },
    image: {
        type:String,
        default:'https://img.myloview.com/murals/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg',
        require:true
    },
    password : {
        type : String,
        require : true
    },verified : {
        type : Boolean,
        default : false
    }
   

}, {
    timestamps: true
});



const User = mongoose.model('User', userSchema);

module.exports = User;