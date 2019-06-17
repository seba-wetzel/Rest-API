const express = require('express');
const product = express.Router();

const ProductsCtrl = require('../controllers/ProductsCtrl');
const isAuth   = require('../middleware/auth');


// Crea el elemento
product.post('/', ProductsCtrl.saveProduct)
//Retorna todos los elementos
product.get('/',  ProductsCtrl.getProducts)
// Devuelve un elemento por su id
product.get('/:elementId', ProductsCtrl.getProductById)
// Busca y actualiza los datos de un solo elemento por su id
product.put('/:elementId', ProductsCtrl.updateProductById)
// Busca y remueve un elemento por su id
product.delete('/:elementId',ProductsCtrl.removeProductById)


module.exports = product;