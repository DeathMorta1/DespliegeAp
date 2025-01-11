const jwt = require('jsonwebtoken');

const secreto = process.env.SECRETO;

let generarToken = (login,rol) => jwt.sign({login: login, rol:rol}, secreto, {expiresIn: "2 hours"});

let validarToken = token => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) {}
}

let protegerRuta = (req, res, next) => {
    
    let token = req.headers['authorization'];
    
    if (token && token.startsWith("Bearer ")) 
    {    
        token = token.slice(7);
        let resultado = validarToken(token);

        if (resultado &&  resultado.rol !== '')            
            next(); 
        else
            res.send({ok: false, error: "Usuario no autorizado"});
    } else     
        
        res.send({ok: false, error: "Usuario no autorizado"});
}



module.exports = {
    generarToken: generarToken,
    validarToken: validarToken,
    protegerRuta: protegerRuta
};
