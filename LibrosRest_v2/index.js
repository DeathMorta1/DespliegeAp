const mongoose = require('mongoose');
const express = require('express');
//const Libro = require(__dirname + "/models/libro");
//const Autor=require(__dirname + "/models/autor");
const autores = require(__dirname+'/routes/autores');
const libros = require(__dirname+'/routes/libros');

mongoose.connect('mongodb://127.0.0.1:27017/libro');

let app = express();
app.use(express.json());
app.use('/autores',autores);
app.use('/libros',libros);
app.listen(8080);
/*app.get('/libro', async (req, res) => {
    try {
      const resultado = await Libro.find(); 
      res.status(200).send({ ok: true, resultado: resultado });
    } catch (error) {
      res.status(500).send({ ok: false, error: "Error obteniendo libros" });
    }
});

app.get('/libro/:id', (req, res) => {
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

app.post('/libro', (req, res) => {

    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor: new Autor(req.body.autor)
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

app.put('/libro/:id', (req, res) => {

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

app.delete('/libro/:id', (req, res) => {

    Libro.findByIdAndDelete(req.params.id)
    .then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error eliminando libro"});
    });
});*/