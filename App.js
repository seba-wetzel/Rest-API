// server.js
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

//Esto debe ir en otro lado
const userCtrl = require('./controllers/UserCtrl');
const isAuth   = require('./middleware/auth');

//Rutas
const element = require('./routes/Elements');

// Creamos la App de express y sus configuraciones
const App = express();

// Middlewares
App.use(cors());
App.use(parser.json());
App.use(parser.urlencoded({extended: true}));

//Rutas
App.use('/element', isAuth , element);

//Estas rutas hay que cambiarlas
App.get('/private', isAuth, (req, res)=>{ 
    res.status(200).send({message: 'Tienes acceso'}) 
})

App.post('/signup', userCtrl.signUp);
App.post('/signin', userCtrl.signIn)


module.exports = App;