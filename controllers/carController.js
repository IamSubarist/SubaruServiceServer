const {Car} = require('../models/models')

class CarController {
    async create(req, res) {
       const {name} = req.body
       const car = await Car.create({name})
       return res.json(car) 
    }

    async getAll(req, res) {
        const cars = await Car.findAll()
        return res.json(cars)
    }

    async delete(req, res) {
        const {name} = req.body
        const car = await Car.destroy({where: {name}})
        return res.json(car)
    }
}

module.exports = new CarController()