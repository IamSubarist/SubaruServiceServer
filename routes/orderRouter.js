const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Маршрут для создания нового заказа
router.post("/", orderController.createOrder);

module.exports = router;
