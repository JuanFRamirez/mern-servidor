const Usuario = require('../models/Usuario');
const bcrypt =  require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req,res)=>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({msg:errores.array()})
    }

    const {email,password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:"El usuario no existe"});
        }

        let passCorrecto = await bcrypt.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:"El password es incorrecto"})
        }

        //si todo es correcteo crear y firmar el jwt

        const payload={
            usuario:{
                id:usuario.id
            }
        }
        //firmar jwt
    
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600
        },(error,token)=>{
            if(error)throw error;
            //confirmacion
            res.json({token});
        })
        
        
    } catch (error) {
        console.log(error);
    }   

}

exports.usuarioAutenticado = async (req,res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Hubo un error"});
        
    }
}