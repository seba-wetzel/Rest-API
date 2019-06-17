// server.js
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

//Esto debe ir en otro lado
const {signUp, signIn} = require('./controllers/UserCtrl');
const isAuth   = require('./middleware/auth');

//Rutas
const element = require('./routes/Elements');
const products = require('./routes/Products');

// Creamos la App de express y sus configuraciones
const App = express();

// Middlewares
App.use(cors());
App.use(parser.json());
App.use(parser.urlencoded({extended: true}));

//Rutas
App.use('/element', isAuth, element);
App.use('/products', isAuth, products);

//Estas rutas hay que cambiarlas
App.get('/private', isAuth, (req, res)=>{ 
    res.status(200).send({message: 'Tienes acceso'}) 
})
//Rutas de sesiones
App.post('/signup', signUp);
App.post('/signin', signIn)


module.exports = App;