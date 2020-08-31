const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //leer token del header
    const token = req.header('x-auth-token');

    //revisar si no hay token

    if(!token){
        return res.status(401).json({msg:'No hay token, permiso denegado'});
    }

    try {

        const cifrado = jwt.verify(token,process.env.SECRETA);
       
        req.usuario = cifrado.usuario;
        next()
        
    } catch (error) {
        if(jwt.TokenExpiredError){
            console.log('token expired' +' ' +token)
        }
        return res.status(401).json({msg: "Token no valido"});
        
        
    }


    //validar token
}