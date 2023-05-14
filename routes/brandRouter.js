const Router = require('express')
const router = Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), brandController.create)
router.delete('/', checkRole("ADMIN"), brandController.delete)
router.get('/', brandController.getAll)

module.exports = router