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

        if (resultado &&  resultado.rol === 'admin')            
            next(); 
        else
            res.send({ok: false, error: "Usuario no autorizado"});
    } else
         res.send({ok: false, error: "Usuario no autorizado"});
}

let protegerRutaPatient = (req,res,next)=>{
    let token = req.headers['authorization'];

    if(token && token.startsWith("Bearer ")){
        token = token.slice(7);
        let resultado = validarToken(token);

        if (resultado &&  resultado.rol !== 'patient')            
            next(); 
        else
            res.send({ok: false, error: "Usuario no autorizado"});
    }else
        res.send({ok: false, error: "Usuario no autorizado"});
};

let protegerPrueba = (valor=0)=>{
    return (req,res,next)=>{
        let token = req.headers['authorization'];
    
        if(token && token.startsWith("Bearer ")){
            token = token.slice(7);
            let resultado = validarToken(token);
            
            if(resultado && resultado.rol ==='admin')
                next();
            else if (resultado &&  resultado.rol !== 'patient' && valor === 1)            
                next();
            else
                res.send({ok: false, error: "Usuario no autorizado"});
            
        }else
            res.send({ok: false, error: "Usuario no autorizado"});
    };
};






module.exports = {
    generarToken: generarToken,
    validarToken: validarToken,
    protegerRuta: protegerRuta,
    protegerRutaPatient:protegerRutaPatient,
    protegerPrueba:protegerPrueba
};
