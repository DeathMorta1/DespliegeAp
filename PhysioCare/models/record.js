const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    physio:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'physio',
        required: true
    },
    diagnosis:{
        type:String,
        required:true,
        minlenght:10,
        maxlenght:500
    },
    treatment:{
        type:String,
        required:true
    },
    observations:{
        type:String,
        required:false,
        maxlenght:500
    }

});



const recordSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    medicarRecord:{
        type:String,
        required:false,
        maxlenght:1000
    },
    appointments:[consultaSchema]
});


let Record = mongoose.model('record',recordSchema);
module.exports = Record;