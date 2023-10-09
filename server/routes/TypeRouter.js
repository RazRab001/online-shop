const Router = require('express')
const router = new Router
const typeController = require('../controllers/typeController')
const checkRoles = require('../middleware/CheckRoleMiddleWare')

router.get('/', typeController.get)
router.post('/', checkRoles('ADMIN'), typeController.create)
router.delete('/:id', checkRoles('ADMIN'), typeController.delete)

module.exports = router