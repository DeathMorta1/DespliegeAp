const express = require('express');
const auth = require(__dirname + '/../utils/auth.js');

let router = express.Router();

const usuarios = [
    { usuario: 'yo', password: '1234' }
];

router.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(u =>
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: auth.generarToken(usuario)});
    else
        res.send({ok: false});
});

module.exports = router;