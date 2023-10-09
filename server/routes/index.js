const Router = require('express')
const router = new Router
const deviceRouter = require('./DeviceRouter')
const userRouter = require('./UserRouter')
const typeRouter = require('./TypeRouter')
const brandRouter = require('./BrandRouter')
const ratingRouter = require('./RatingRouter')
const basketRouter = require('./BasketRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/rate', ratingRouter)
router.use('/basket', basketRouter)

module.exports = router