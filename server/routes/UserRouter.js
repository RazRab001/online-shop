const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleWare = require('../middleware/AuthMiddlWare')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleWare, userController.check)

module.exports = router