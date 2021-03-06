const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el server

const app = express()

//habilitar cors

app.use(cors());

//conectar con la db
conectarDB();


//puerto de la app
const port = process.env.PORT || 4000

app.use(express.json({extended:true}));

//importar rutas

app.use('/api/usuarios',require('./routes/usuarios'));

app.use('/api/auth',require('./routes/auth'));

app.use('/api/proyectos',require('./routes/proyectos'));

app.use('/api/tareas',require('./routes/tareas'));


//arrancar la app
app.listen(port,'0.0.0.0',()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})