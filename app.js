// server.js
var express = require('express')
var parser = require('body-parser')
var cors = require('cors')
var Datastore = require('nedb')
// Creamos la app de express y sus configuraciones
var app = express();

// Permite cambiar el HTML con el método POST
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// Base de datos
db = new Datastore({filename: 'datafile.json', autoload: true});

// Rutas de la api

// Devuelve todos los usuarios registrados
app.get('/users', function(req, res) {
    console.log('GET request on /users ')
    db.find({}, function(err, users) {
        if (err) {
            res.status(403).end()
        } else {
            res.json(users)
        }
    })
})

// Se crea un nuevo usuario, solo devuelve cabeceras de estado
app.post('/users', function(req, res) {
    console.log('POST request on /users')
    newUser = req.body
    db.insert(newUser, function(err, newDocInsert) {
        if (err) {
            res.status(403).end()
        } else {
            res.status(200).end()
        }
    });
})

// Busca usuarios con coincidencias entre el numero de telefono y el request
app.get('/users/:phone', function(req, res) {
    console.log('GET request on /users/:phone')
    buscar = new RegExp(req.params.phone)
    db.find({
        phone: buscar
    }, function(err, usersFind) {
        if (err) {
            res.status(403).end()
        } else {
            console.log(usersFind)
            res.json(usersFind)
        }
    })
})

// Busca un solo usuario por su id
app.get('/users/id/:_id', function(req, res) {
    console.log('GET request on /users/id/:id')
    buscar = req.params._id
    db.findOne({
        _id: buscar
    }, function(err, userFind) {
        if (err) {
            res.status(403).end()
        } else {
            console.log(userFind)
            res.json(userFind)
        }
    })
})

// Busca y actualiza los datos de un solo usuario por su id
app.put('/users/id/:_id', function(req, res) {
    console.log('PUT request on /users/id/:id')
    buscar = req.params._id
    db.update({
        _id: buscar
    }, {
        name: req.body.name,
        phone:req.body.phone,
        cel: req.body.cel,
        dir: req.body.dir
    }, {}, function(err, userUpdated) {
        if (err) {
            res.status(403).end()
        } else {
            res.status(200).end()
        }
    })
})

// Busca y remueve a un usuario por su id
app.delete('/users/id/:_id', function(req, res) {
    console.log('DELETE request on /users/id/:id')
    buscar = req.params._id
    db.remove({
        _id: buscar
    }, {}, function(err, userRemoved) {
        if (err) {
            res.status(403).end()
        } else {
            console.log(userRemoved)
            res.status(200).end()
        }
    })
})

// Server start listening on port
var port = 80

app.listen(port, function() {
    console.log('App listening on port: ' + port);
});
