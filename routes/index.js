const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const carBrandRouter = require('./carBrandRouter')
const carModelRouter = require('./carModelRouter')
const carRouter = require('./carRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/car_brand', carBrandRouter)
router.use('/car_model', carModelRouter)
router.use('/car', carRouter)

module.exports = router