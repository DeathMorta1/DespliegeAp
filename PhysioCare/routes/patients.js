const express = require('express');

let Patient = require(__dirname+'/../models/patient.js');
const auth = require(__dirname+'/../auth/auth.js');

let router = express.Router();

//Peticion para obtener todos los pacientes.
router.get('/',auth.protegerRuta(['admin','physio']), (req,res)=>{
    Patient.find().then(resultado =>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No hay pacientes en el sistema"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para buscar un paciente/s por apellido
router.get('/find',auth.protegerRuta(['admin','physio']),(req,res)=>{

    Patient.find({surname: {$regex:req.query.surname,$options:'i'}
    }).then(resultado=>{
        res.status(200).send({ok:true,resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No hay pacientes en el sistema"});
    }).catch(error=>{
        res.status(500).send({ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para buscar un paciente por id
router.get('/:id',auth.protegerRuta(['admin','physio','patient']),auth.protegerPorId(),(req,res)=>{
    Patient.findById(req.params.id).then((resultado)=>{
        if(resultado)
            res.status(200).send({ok:true,resultado:resultado});
        else
            res.status(404).send({ok:false,error:"No se encontro ese paciente"});
    }).catch(error=>{
        res.status(500).send({ok:false,error:"Error interno en el servidor"});
    });
});

//Peticion para insertar un paciente 
router.post('/',auth.protegerRuta(['admin','physio']),(req,res)=>{
    let newPatient = new Patient({
        name: req.body.name,
        surname: req.body.surname,
        birthDate: req.body.birthDate,
        address: req.body.address,
        insuranceNumber: req.body.insuranceNumber
    });
    newPatient.save().then(resultado=>{
        res.status(201).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(400).send({ok:false,error:"No se pudo insertar el paciente"});
    });
});

//Peticion para modificar un paciente
router.put('/:id',auth.protegerRuta(['admin','physio']),(req,res)=>{
    Patient.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.name,
            surname: req.body.surname,
            birthDate: req.body.birthDate,
            address: req.body.address,
            insuranceNumber: req.body.insuranceNumber
        }
    }, {new: true}).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(400).send({ok:false,error:"Error actualizando los datos del paciente"});
    }).catch(error=>{
        res.status(500).send({ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para borrar un paciente
router.delete('/:id',auth.protegerRuta(['admin','physio']),(req,res)=>{
    Patient.findByIdAndDelete(req.params.id).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"El paciente a eliminar no existe"});
    }).catch(error=>{
        res.status(500).send({ok:false,error:"Error interno del servidor"});
    });
});


module.exports = router;