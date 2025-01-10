const mongoose = require('mongoose');
const express = require('express');

const autores = require(__dirname+'/routes/autores');
const libros = require(__dirname+'/routes/libros');
const auth = require(__dirname+'/routes/auth');

mongoose.connect('mongodb://127.0.0.1:27017/libro');

let app = express();
app.use(express.json());
app.use('/autores',autores);
app.use('/libros',libros);
app.use('/auth',auth);
app.listen(8080);