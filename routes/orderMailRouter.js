const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");

// Создайте транспорт для отправки писем (например, SMTP)
const orderTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "optimistroma927@gmail.com",
    pass: "cwpfbgkrfidbriwi",
  },
});

// Обработчик маршрута для отправки электронного письма
router.post("/send-email", (req, res) => {
  const data = req.body;

  const orderMailOptions = {
    from: "optimistroma927@gmail.com",
    to: "optimistroma927@gmail.com",
    subject: "Заказ",
    text: `Товар:${data.deviceId}\nКоличество: ${data.quantity}\nСпособ оплаты: ${data.paymentMethod}\nСпособ доставки: ${data.deliveryMethod}\nАдрес доставки: ${data.address}\nИмя: ${data.name}\nКонтактный телефон: ${data.phone}`,
  };

  orderTransporter.sendMail(orderMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Произошла ошибка при отправке письма." });
    } else {
      console.log("Письмо успешно отправлено: " + info.response);
      res.status(200).json({ message: "Письмо успешно отправлено." });
    }
  });
});

module.exports = router;
