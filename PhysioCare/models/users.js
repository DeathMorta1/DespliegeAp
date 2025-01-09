const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    login:{
        type:String,
        require:true,
        minlenght:4,
        trim:true
    },
    password:{
        type:String,
        require:true,
        minlenght:7,
        trim:true
    },
    rol:{
        type:String,
        required:true,
        enum:[
            'admin',
            'physio',
            'patient'
        ]
    }
});

let User = mongoose.model('user',usersSchema);
module.exports = User;