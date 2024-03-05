const mongoose = require('mongoose')

/**
Name 
Userid
Password 
Email
Usertype
*/

const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required: true,
    },
    userID:{
        type: String,
        unqiue: true

    },
    password: {
        type: String,
        required: true,

    },
    email : {
        type :String,
        required : true,
        lowercase: true,
        minLength: 12,
        unqiue: true
    },
    userType: {
        type: String,
        required: true, 
        default: " CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
        
    },
    
}, { timestamps : true, versionkey: false})

module.exports = mongoose.model("User", userSchema)