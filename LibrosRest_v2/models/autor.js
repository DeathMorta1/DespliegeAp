const mongoose = require('mongoose');

let autorSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        minlenght:1,
        trim:true
    },anyo:{
        type:Number,
        min:0,
        max:2000
    }
});

let Autor = mongoose.model('autor',autorSchema);
module.exports=Autor;