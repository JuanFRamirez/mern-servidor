const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el server

const app = express()
//conectar con la db
conectarDB();

//habilitar cors

app.use(cors());
//puerto de la app
const PORT = process.env.PORT || 4000

app.use(express.json({extended:true}));

//importar rutas

app.use('/api/usuarios',require('./routes/usuarios'));

app.use('/api/auth',require('./routes/auth'));

app.use('/api/proyectos',require('./routes/proyectos'));

app.use('/api/tareas',require('./routes/tareas'));


//arrancar la app
app.listen(PORT,()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})