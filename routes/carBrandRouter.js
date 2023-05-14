const Router = require('express')
const router = Router()
const carBrandController = require('../controllers/carBrandController')

router.post('/', carBrandController.create)
router.delete('/', carBrandController.delete)
router.get('/', carBrandController.getAll)

module.exports = router