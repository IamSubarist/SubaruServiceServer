const express = require("express");
const router = express.Router();
const { BasketDevice, User } = require("../models/models");
const ApiError = require("../errors/ApiError");
const authMiddleware = require("../middlewares/AuthMiddleware");

// POST /api/cart/add
router.post("/add", authMiddleware, async (req, res, next) => {
  try {
    const { productId } = req.body;
    console.log(req.body);
    console.log(req.user.id);

    const user = await User.findByPk(req.user.id);

    const cartItem = await BasketDevice.create({
      cartId: user.id,
      productId,
    });

    console.log("Товар успешно добавлен в корзину");
    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// GET /api/cart
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next(ApiError.unauthorized("Пользователь не найден"));
    }

    const cartItems = await BasketDevice.findAll({
      where: { cartId: user.id },
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
