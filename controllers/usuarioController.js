const Usuario = require('../models/Usuario');
const bcrypt =  require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req,res)=>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({msg:errores.array()})
    }

    const {email,password} = req.body;


try{

    let usuario = await Usuario.findOne({email})

    if(usuario){
        return res.status(400).json({msg:'El usuario ya existe'});
    }

    //crea nuevo usuario
    usuario = new Usuario(req.body);

    //hash passw
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password,salt);

    //guarda nuevo usuario
    await usuario.save()

    //crear token
    const payload={
        usuario:{
            id:usuario.id
        }
    }
    //firmar jwt

    jwt.sign(payload,process.env.SECRETA,(error,token)=>{
        if(error)throw error;
        //confirmacion
        res.json({token});
    })




}catch(error){
    console.log(error);
    res.status(400).json({msg:'Hubo un error'});
}
} 