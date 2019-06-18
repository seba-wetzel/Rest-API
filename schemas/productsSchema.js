const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = Schema({
    user: String, 
    name: String,
    createDate: {type: Date, default:Date.now()},
    modificationdate: {type: Date, default:Date.now()},
    elements: []
});

module.exports = mongoose.model('Product', ProductsSchema);