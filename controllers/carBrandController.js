const {CarBrand} = require('../models/models')

class CarBrandController {
    async create(req, res) {
       const {name} = req.body
       const carBrand = await CarBrand.create({name})
       return res.json(carBrand) 
    }

    async getAll(req, res) {
        const carBrands = await CarBrand.findAll()
        return res.json(carBrands)
    }

    async delete(req, res) {
        const {name} = req.body
        const carBrand = await CarBrand.destroy({where: {name}})
        return res.json(carBrand)
    }
}

module.exports = new CarBrandController()