const Router = require('express')
const router = Router()
const carModelController = require('../controllers/carModelController')

router.post('/', carModelController.create)
router.delete('/', carModelController.delete)
router.get('/', carModelController.getAll)

module.exports = router