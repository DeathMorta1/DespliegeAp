const express = require('express');

let Physio = require(__dirname+'/../models/physio.js');
const {protegerRuta,protegerPorId} = require(__dirname+'/../auth/auth.js');

const router = express.Router();


//Peticion para recuperar todos los physios
router.get('/',protegerRuta(["admin","physio","patient"]),(req,res)=>{
    Physio.find().then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado})
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No hay fisios en el sistema"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para buscar un physio por especialidad
router.get('/find',protegerRuta(["admin","physio","patient"]),(req,res)=>{
    const { specialty } = req.query;
    Physio.find({
        specialty: {$regex:specialty,$options:'i'}
    }).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No hay fisios en el sistema con esos criterios"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para buscar un physio por id
router.get('/:id',protegerRuta(["admin","physio","patient"]),(req,res)=>{
    Physio.findById(req.params.id).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(404).send({ok:false,error:"No se encontro el physio"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para insertar un physio
router.post('/',protegerRuta(["admin"]),(req,res)=>{
    let newPhysio = new Physio({
        name: req.body.name,
        surname: req.body.surname,
        specialty: req.body.specialty,
        licenseNumber: req.body.licenseNumber
    });
    newPhysio.save().then(resultado=>{
        res.status(201).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(400).send({ok:false,error:"No se pudo insertar el physio"});
    });
});

//Peticion para modificar un physio
router.put('/:id',protegerRuta(["admin"]),(req,res)=>{
    Physio.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.name,
            surname: req.body.surname,
            specialty: req.body.specialty,
            licenseNumber: req.body.licenseNumber
        }
    }, {new: true}).then(resultado=>{
        res.status(200).send({ok:true,resultado:resultado});
    }).catch(error=>{
        res.status(400).send({ok:false,error:"Error actualizando los datos del fisio"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});

//Peticion para borrar el physio
router.delete('/:id',protegerRuta(["admin"]),(req,res)=>{
    Physio.findByIdAndDelete(req.params.id).then(resultado=>
        res.status(200).send({ok:true,resultado:resultado})
    ).catch(error=>{
        res.status(404).send({ok:false,error:"El fisioterapeuta a eliminar no existe"});
    }).catch(error=>{
        res.status(500).send({  ok:false,error:"Error interno del servidor"});
    });
});


module.exports = router;