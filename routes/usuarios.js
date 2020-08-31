const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require ('express-validator');

//crear usuario
//api/usuarios

router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Escribe un email valido').isEmail(),
    check('password','Escribe un password de al menos 6 caracteres').isLength({min:6})
],
    usuarioController.crearUsuario
);

module.exports = router;