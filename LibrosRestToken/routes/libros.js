const express = require('express');
const auth = require(__dirname + '/../utils/auth.js');
let Libro = require(__dirname+"/../models/libro");

let router = express.Router();

router.get('/',auth.protegerRuta, async (req, res) => {
    try {
      const resultado = await Libro.find(); 
      res.status(200).send({ ok: true, resultado: resultado });
    } catch (error) {
      res.status(500).send({ ok: false, error: "Error obteniendo libros" });
    }
});

router.get('/:id',auth.protegerRuta, (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se ha encontrado el libro"});
    }).catch (error => {
        res.status(500)
           .send({ok: false, 
                  error: "Error buscando el libro indicado"});
    }); 
});

router.post('/',auth.protegerRutaAdmin, (req, res) => {

    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor: req.body.autor
    });

    nuevoLibro.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error añadiendo libro"});
    });
});

router.put('/:id',auth.protegerRutaAdmin, (req, res) => {

    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio
        }
    }, {new: true}).then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error actualizando contacto"});
    });
});

router.delete('/:id',auth.protegerRutaAdmin, (req, res) => {

    Libro.findByIdAndDelete(req.params.id)
    .then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error eliminando libro"});
    });
});

module.exports = router;