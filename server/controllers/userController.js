const {User, Basket, Device, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.bedRequest("Unknown password or email"))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.bedRequest("User already exist"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = jwt.sign({id: user.id, email, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: '12h'}
        )
        return res.json({token})
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            // Find the user by their email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                // User not found
                return next(ApiError.internal("User dont found"))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword){
                return  next(ApiError.bedRequest("No enter ID"))
            }
            const token = jwt.sign({id: user.id, email, role: user.role},
                process.env.SECRET_KEY,
                {expiresIn: '12h'}
            )
            return res.json({token})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async check(req, res, next){
        res.json({message: "all work"})
    }


}

module.exports = new UserController()