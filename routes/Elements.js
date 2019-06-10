const express = require('express');
const element = express.Router();

const ElementsCtrl = require('../controllers/ElementsCtrl');
const isAuth   = require('../middleware/auth');


// Crea el elemento
element.post('/', ElementsCtrl.saveElement)
//Retorna todos los elementos
element.get('/', isAuth, ElementsCtrl.getElements)
// Devuelve un elemento por su id
element.get('/:elementId', ElementsCtrl.getElementById)
// Busca y actualiza los datos de un solo elemento por su id
element.put('/:elementId', ElementsCtrl.updateElementById)
// Busca y remueve un elemento por su id
element.delete('/:elementId',ElementsCtrl.removeElementById)


module.exports = element;