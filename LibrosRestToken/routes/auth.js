// Importamos el módulo Express para manejar rutas y peticiones
const express = require('express');

// Importamos el módulo de autenticación personalizado desde utils/auth
const auth = require(__dirname + '/../utils/auth');

// Creamos un enrutador de Express para definir las rutas de autenticación
let router = express.Router();

// Simulamos la base de datos así
const usuarios = [
    { login: 'Pepe', password: '1234', rol: 'admin'},
    { login: 'Juan', password: '123', rol: 'editor'}
];

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(u =>
        u.login == login && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: auth.generarToken(login)});
    else
        res.send({ok: false});
});

// Exportamos el enrutador para usarlo en otros módulos de la aplicación
module.exports = router;