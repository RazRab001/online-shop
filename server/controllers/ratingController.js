const {Device, User, Rating} = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController{
    async add(req, res, next) {
        const { id } = req.params;
        const { email, rate } = req.body;
        const device = await Device.findOne({ where: { id } });
        const user = await User.findOne({ where: { email } });

        if (device && user) {
            const findingRating = await Rating.findOne(
                { where: { userId: user.id, deviceId: id } }
            );

            if (!findingRating) {
                const rating = await Rating.create({ rate, userId: user.id, deviceId: id });
                const ratings = await Rating.findAll({ where: { deviceId: id } });
                let sum = 0;

                for (const rating of ratings) {
                    sum += rating.rate;
                }

                // Calculate the average rating
                const averageRating = ratings.length > 0 ? (sum / ratings.length).toFixed(2) : '0.00';

                // Convert the averageRating to an integer
                const integerRating = parseFloat(averageRating) * 100;

                // Update the device's rating with the integer value
                await device.update({ rating: integerRating });

                res.json({ device, averageRating });
            } else {
                return next(ApiError.bedRequest("You already sent a rating to this device"));
            }
        } else {
            return next(ApiError.bedRequest("Unknown device"));
        }
    }

}

module.exports = new RatingController()