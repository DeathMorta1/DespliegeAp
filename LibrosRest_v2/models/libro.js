const mongoose = require('mongoose');

let libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    editorial: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    precio: {
        type: Number,
        min: 1
    },
    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    }
});

let Libro = mongoose.model('libros',libroSchema);

module.exports=Libro;