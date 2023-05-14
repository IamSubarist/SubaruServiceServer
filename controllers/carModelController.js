const {CarModel} = require('../models/models')

class CarModelController {
    async create(req, res) {
       const {name} = req.body
       const carModel = await CarModel.create({name})
       return res.json(carModel) 
    }

    async getAll(req, res) {
        const carModels = await CarModel.findAll()
        return res.json(carModels)
    }

    async delete(req, res) {
        const {name} = req.body
        const carModel = await CarModel.destroy({where: {name}})
        return res.json(carModel)
    }
}

module.exports = new CarModelController()