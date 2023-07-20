const mongoose = require('mongoose')

const User = mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : { 
        type : String,
        require : true
    }, 
    birthday : {
        type : Date,
    }
})

module.exports = mongoose.model('user', User)