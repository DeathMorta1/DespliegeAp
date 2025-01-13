const jwt = require('jsonwebtoken');

const secreto = process.env.SECRETO;

let generarToken = (id,login,rol) => jwt.sign({id:id,login: login, rol:rol}, secreto, {expiresIn: "2 hours"});

let validarToken = (token) => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) {}
}

let protegerRuta = (rol)=>{
    return (req, res, next) => {
    
        let token = req.headers['authorization'];
        
        if (token && token.startsWith("Bearer ")) 
        {    
            token = token.slice(7);
            let resultado = validarToken(token);
    
            if (resultado && (rol == "" || rol.some(r => r == result.rol)))           
                next(); 
            else
                res.send({ok: false, error: "Usuario no autorizado"});
        } else
             res.send({ok: false, error: "Usuario no autorizado"});
    }
};

let protegerPorId = ()=>{
    return (req,res,next)=>{
        let token = req.headers['authorization'];
    
        if(token && token.startsWith("Bearer ")){
            token = token.slice(7);
            let resultado = validarToken(token);
            let id = req.params.id;

            if (resultado &&  (resultado.rol === 'patient' || id === resultado.id))            
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
    protegerPorId:protegerPorId
};
