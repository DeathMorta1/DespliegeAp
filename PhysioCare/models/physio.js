const mongoose = require('mongoose');

const physioSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlenght:2,
        maxlenght:50
    },
    surname:{
        type:String,
        required:true,
        minlenght:2,
        maxlenght:50
    },
    specialty:{
        type:String,
        required:true,
        enum:[
            'Sports',
            'Neurological',
            'Pediatric',
            'Geriatric',
            'Oncological'
        ]
    },
    licenseNumber:{
        type:String,
        required:true,
        match: /^[a-zA-Z0-9]{8}$/,
        unique:true
    }
});




let Physio = mongoose.model('physio',physioSchema);
module.exports = Physio;