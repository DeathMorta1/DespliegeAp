const express = require('express');

// Importamos el módulo de autenticación personalizado desde utils/auth
const auth = require(__dirname + '/../utils/auth');

// Creamos un enrutador de Express para definir las rutas de autenticación
let router = express.Router();

let User = require(__dirname+'/../models/users.js');


// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let existeUsuario = User.filter(u =>
        u.login == login && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: auth.generarToken(existeUsuario[0].login,
                                                     existeUsuario[0].rol)});
    else
        res.send({ok: false, message:"login incorrecto"});
});

// Exportamos el enrutador para usarlo en otros módulos de la aplicación
module.exports = router;