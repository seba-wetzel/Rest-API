const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ElementsSchema = Schema({
    name: String,
    type: { type: String, enum: ['unit', 'lineal', 'area'] },
    price: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 }
});

module.exports = mongoose.model('Element', ElementsSchema);