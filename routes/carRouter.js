const Router = require('express')
const router = Router()
const carController = require('../controllers/carController')

router.post('/', carController.create)
router.delete('/', carController.delete)
router.get('/', carController.getAll)

module.exports = router