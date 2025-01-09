const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlenght:2,
        trim:true,
        maxlenght:50
    },
    surname:{
        type:String,
        required:true,
        minlenght:2,
        trim:true,
        maxlenght:50
    },
    birthDate:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:false,
        maxlenght:100
    },
    insuranceNumber:{
        type:String,
        required:true,
        match: /^\d{9}$/,
        unique:true
    }
});


let Patient = mongoose.model('patient',patientSchema);
module.exports=Patient;