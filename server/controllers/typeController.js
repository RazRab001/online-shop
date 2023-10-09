const {Type, Brand} = require('../models/models')
const ApiError = require("../error/ApiError");
class TypeController{
    async get(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            let brand = await Type.findOne({ where: { id } });
            if (brand) {
                await brand.destroy();
                return res.json({ message: "Object deleted", deletedObject: brand });
            } else {
                return res.status(404).json({ message: "Object not found" });
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TypeController()