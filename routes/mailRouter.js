const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");

// Создайте транспорт для отправки писем (например, SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "optimistroma927@gmail.com",
    pass: "cwpfbgkrfidbriwi",
  },
});

// Обработчик маршрута для отправки электронного письма
router.post("/send-email", (req, res) => {
  const data = req.body;

  const mailOptions = {
    from: "optimistroma927@gmail.com",
    to: "optimistroma927@gmail.com",
    subject: "Новая заявка на консультацию/запись",
    text: `${data.type}\nИмя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
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
