const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
class UserController{
    async registration(req, res){
        const {email, password} = req.body
        const user = await User.create({email, password})
        return res.json(user)
    }
    async login(req, res){

    }
    async check(req, res, next){
        const {id} = req.query
        if(!id){
            return next(ApiError.bedRequest('no id'))
        }
        res.json(id)
    }
}

module.exports = new UserController()