// server.js
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const isAuth = require('./middleware/auth')
//Rutas
const element = require('./routes/Elements')

// Creamos la App de express y sus configuraciones
const App = express();

// Middlewares
App.use(cors());
App.use(parser.json());
App.use(parser.urlencoded({extended: true}));

//Rutas
App.use('/element', element);
App.use('/private', isAuth, (req, res)=>{ 
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = App;