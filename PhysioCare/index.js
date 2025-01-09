const mongoose = require('mongoose');
const express = require('express');
const auth = require(__dirname+'/auth/auth');

const patients = require(__dirname+'/routes/patients');
const physios = require(__dirname+'/routes/physios');
const records = require(__dirname+'/routes/records');

console.log(auth.uno);

mongoose.connect('mongodb://127.0.0.1:27017/physiocare');

let app = express();
app.use(express.json());
app.use('/patients',patients);
app.use('/physios',physios);
app.use('/records',records);
app.listen(8080);