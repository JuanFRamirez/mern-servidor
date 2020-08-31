const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator');


exports.crearProyecto = (req,res)=>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({msg:errores.array()})
    }

try{
    //crear nuevo proyecto
    const proyecto = new Proyecto(req.body);
    //agregar el creador del proyecto
    proyecto.creador = req.usuario.id
    proyecto.save();
    res.json(proyecto);

}catch(error){
    console.log(error);
    res.status(500).json({msg:"Hubo un error"})
}
}

//obtener proyectos

exports.obtenerProyecto = async(req,res)=>{
    try {
        const proyectos = await Proyecto.find({creador:req.usuario.id});
        res.json({proyectos})
        
    } catch (error) {
        return res.status(500).send("Hubo un error");
    }
}

//actualizar proyecto por id

exports.actualizarProyecto = async(req,res)=>{

    //validar errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({msg:errores.array()})
    }
    const {nombre} = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre
    }
    try {

        let proyecto = await Proyecto.findById(req.params.id)

        if(!proyecto){
            return res.status(404).json({msg:"Proyecto no encontrado"})
        }

        if(proyecto.creador.toString()!== req.usuario.id) {
        return res.status(401).json({msg:"Usuario no autorizado"});
        }

        proyecto = await Proyecto.findByIdAndUpdate({_id:req.params.id},{$set:nuevoProyecto},{new:true});
        res.json({proyecto})

        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }

}

//eliminar proyecto

exports.eliminarProyecto = async(req,res)=>{
    try{

        let proyecto = await Proyecto.findById(req.params.id)

        if(!proyecto){
            return res.status(404).json({msg:"Proyecto no encontrado"})
        }

        if(proyecto.creador.toString()!== req.usuario.id) {
        return res.status(401).json({msg:"Usuario no autorizado"});
        }

        await Proyecto.findOneAndRemove({_id:req.params.id});
        res.json({msg:"Proyecto eliminado"});


    }catch(error){
        console.log(error);
        return res.status(500).json({msg:"Hubo un error"})
    }
}