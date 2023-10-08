const {Type} = require('../models/models')
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
}

module.exports = new TypeController()