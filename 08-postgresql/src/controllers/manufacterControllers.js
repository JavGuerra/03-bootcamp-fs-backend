const { response } = require('../modules/utils');
const manufacterServices = require('../services/manufacterServices');

const getAllManufacters = async (req, res) => {
    const allManufacters = await manufacterServices.getAllManufacters();
    res.send(response(allManufacters));
};

const getManufacter = async (req, res) => {
    const manufacter = await manufacterServices.getManufacter(req.params.marca);
    res.send(response(manufacter));
};

module.exports = {
    getAllManufacters,
    getManufacter
};