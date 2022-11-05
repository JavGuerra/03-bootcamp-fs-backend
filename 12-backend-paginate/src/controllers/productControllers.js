const productServices = require('../services/productServices');

const getAllProducts = async (req, res) => {
    let { page = 1, limit = 5 } = req.query;
    page  = page  ? page  : 1;
    limit = limit ? limit : 5;
    if (isNaN(page)  || page  < 1) page  = 1;
    if (isNaN(limit) || limit < 1) limit = 5;

    const populate = { path: 'manufacturer.ref', select: '-_id cif address' };
    const options  = { page, limit, populate };

    const result = await productServices.getAllProducts({}, options);
    const response_code = (result.docs.length) ? 0 : 1;
    res.json({response_code, result});
};

module.exports = { getAllProducts };