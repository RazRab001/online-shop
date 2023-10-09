const Router = require('express')
const router = new Router
const ratingController = require('../controllers/ratingController')

router.post('/:id', ratingController.add)

module.exports = router