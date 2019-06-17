const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = Schema({
    //TODO add a user fild with the user id owner
    //TODO add a timestamp fild for the last modification
    user: String, 
    name: String,
    elements: []
});

module.exports = mongoose.model('Element', ProductsSchema);