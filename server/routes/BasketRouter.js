const Router = require('express')
const router = new Router
const basketController = require('../controllers/basketController')

router.post('/:userId/:deviceId', basketController.add)
router.get('/:id', basketController.getAllDevices)

module.exports = router