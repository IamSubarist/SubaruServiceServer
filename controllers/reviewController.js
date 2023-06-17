const { Reviews } = require("../models/models");

class ReviewsController {
  async create(req, res) {
    const { name, description } = req.body;
    const review = await Reviews.create({ name, description });
    return res.json(review);
  }

  async getAll(req, res) {
    const reviews = await Reviews.findAll();
    return res.json(reviews);
  }

  async delete(req, res) {
    const { name } = req.body;
    const review = await Reviews.destroy({ where: { name } });
    return res.json(review);
  }
}

module.exports = new ReviewsController();
