const {Rating, Type, Brand, Device, User, Basket, BasketDevice, DeviceInfo} = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController{
    async add(req, res, next){
        const {userId, deviceId} = req.params
        const basket = await Basket.findOne({where: {userId}})
        if(basket){
            const basket_device = await BasketDevice.create({basketId: basket.id, deviceId})
            res.json(basket_device)
        } else {
            return next(ApiError.bedRequest("Unknown user"))
        }
    }

    async getAllDevices(req, res, next) {
        const { id } = req.params;
        const basket = await Basket.findOne({ where: { userId: id } });

        if (basket) {
            const devices = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: [
                    {
                        model: Device,
                    }
                ]
            });

            res.json(devices);
        } else {
            return next(ApiError.bedRequest("Unknown user"));
        }
    }

}

module.exports = new BasketController()