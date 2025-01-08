const express = require('express');

let Autor = require(__dirname+"/../models/autor.js");

let router = express.Router();

router.get('/', async (req, res) => {
    try {
      const resultado = await Autor.find(); 
      res.status(200).send({ ok: true, resultado: resultado });
    } catch (error) {
      res.status(500).send({ ok: false, error: "Error obteniendo libros" });
    }
});

router.get('/:id', (req, res) => {
    Autor.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se ha encontrado el autor"});
    }).catch (error => {
        res.status(500)
           .send({ok: false, 
                  error: "Error buscando el autor indicado"});
    }); 
});

router.post('/', (req, res) => {

    let nuevoAutor = new Autor({
        nombre: req.body.nombre,
        anyo: req.body.anyo
    });

    nuevoAutor.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error añadiendo autor"});
    });
});

router.put('/:id', (req, res) => {

    Autor.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            anyo: req.body.anyo
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

router.delete('/:id', (req, res) => {

    Autor.findByIdAndDelete(req.params.id)
    .then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error eliminando autor"});
    });
});

module.exports = router;