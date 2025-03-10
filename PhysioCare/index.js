const mongoose = require('mongoose');
const express = require('express');


const patients = require(__dirname+'/routes/patients');
const physios = require(__dirname+'/routes/physios');
const records = require(__dirname+'/routes/records');
const auth = require(__dirname+'/routes/auth');


mongoose.connect('mongodb://127.0.0.1:27017/physiocare');

let app = express();
app.use(express.json());
app.use('/patients',patients);
app.use('/physios',physios);
app.use('/records',records);
app.use('/auth',auth);
app.listen(8080);