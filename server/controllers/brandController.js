const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
class BrandController{
    async get(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async create(req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            let brand = await Brand.findOne({ where: { id } });
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

module.exports = new BrandController()