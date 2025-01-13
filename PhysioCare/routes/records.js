const express = require('express');

const Record = require(__dirname+'/../models/record.js');
const {protegerRuta,protegerPorId} = require(__dirname+'/../auth/auth.js');

const router = express.Router();

//Peticion para recuperar todos los Records
router.get('/',protegerRuta(["admin","physio"]),(req,res)=>{
    Record.find().then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No se encontraron expedientes en el sistema"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para recuperar los Records por el apellido del paciente
router.get('/find',protegerRuta(["admin","physio"]),(req,res)=>{
    const { surname } = req.query;
    Record.find({
        surname: {$regex:surname,$options:'i'}
    }).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No se encontraron expedientes en el sistema"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para buscar un record por id
router.get('/:id',protegerRuta(["admin","physio","patient"]),protegerPorId(),(req,res)=>{
    Record.findById(req.params.id).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No se encontraron expedientes en el sistema"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para insertar un Record.
router.post('/',protegerRuta(["admin","physio"]),(req,res)=>{
    let newRecord = new Record({
        patient: req.body.patient,
        medicarRecord: req.body.medicarRecord
    });
    newRecord.save().then(resultado=>{
        res.status(201).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(400).send({ok:false,error:"No se pudo insertar el expediente"});
    });
});

//Peticion para insertar una cita
router.post('/:id/appointments',protegerRuta(["admin","physio"]),(req,res)=>{
    Record.findById(req.params.id).then(record=>{

        if(!record){
            return res.status(404).send({ok:false,error:"No se encontraron expedientes en el sistema"});
        }

        record.appointments.push({
            date: req.body.date,
            physio: req.body.physio,
            diagnosis: req.body.diagnosis,
            treatment: req.body.treatment,
            observations: req.body.observations
        });

        return record.save();
    }).then(resultado=>{
        res.status(201).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para borrar record
router.delete('/:id',protegerRuta(["admin","physio"]),(req,res)=>{
    Record.findByIdAndDelete(req.params.id).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No se encontraron expedientes en el sistema"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});


module.exports = router;