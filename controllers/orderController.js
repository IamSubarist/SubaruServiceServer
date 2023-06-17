const { Order, User, Device } = require("../models/models");

// Создание нового заказа
async function createOrder(req, res) {
  const {
    userId,
    deviceId,
    quantity,
    paymentMethod,
    deliveryMethod,
    deliveryAddress,
    contactName,
    contactPhone,
  } = req.body;

  try {
    // Проверяем наличие пользователя и товара
    const user = await User.findByPk(userId);
    const device = await Device.findByPk(deviceId);
    if (!user || !device) {
      return res
        .status(404)
        .json({ error: "Пользователь или товар не найден" });
    }

    // Создаем новый заказ
    const order = await Order.create({
      quantity,
      paymentMethod,
      deliveryMethod,
      deliveryAddress,
      contactName,
      contactPhone,
      userId: userId,
      deviceId: deviceId,
    });

    return res.status(201).json({ message: "Заказ успешно создан", order });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    return res
      .status(500)
      .json({ error: "Произошла ошибка при создании заказа" });
  }
}

module.exports = {
  createOrder,
};
