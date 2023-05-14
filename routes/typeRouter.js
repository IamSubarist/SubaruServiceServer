const Router = require('express')
const router = Router()
const typeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), typeController.create)
router.delete('/', checkRoleMiddleware("ADMIN"), typeController.delete)
router.get('/', typeController.getAll)

module.exports = router