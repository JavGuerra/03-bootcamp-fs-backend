const { model, Schema } = require('mongoose');

const productSchema = new Schema(
    {
        _id: String,
        name: String,
        manufacturer: String,
        price: Number,
        color: String
    },
    { versionKey: false }
);

const Product = model('Product', productSchema);

module.exports = Product;