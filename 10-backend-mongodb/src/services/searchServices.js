const productModel = require('../schemas/Product-schema');

const getFilteredProducts = async (modelo, color, precio, marca) => {
    const filter = {};
    if (modelo) filter.name  = { $regex: `.*${modelo}.*` };
    if (color ) filter.color = { $regex: `.*${color}.*` };
    if (precio) filter.price = { $lt: precio };
    if (marca ) filter.manufacter = { $regex: `.*${marca}.*` };
    
    return await productModel.find(filter).exec();
    // return await productModel.find(filter).populate('manufacter._id').exec();
}

module.exports = { getFilteredProducts };