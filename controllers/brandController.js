const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name, typeId } = req.body;
    const brand = await Brand.create({ name, typeId });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const brand = await Brand.findOne({ where: { id } });
    return res.json(brand);
  }

  async delete(req, res) {
    const { id } = req.body;
    const brand = await Brand.destroy({ where: { id } });
    return res.json(brand);
  }
}

module.exports = new BrandController();
