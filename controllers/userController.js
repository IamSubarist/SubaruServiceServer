const { User, Basket } = require("../models/models");
const ApiError = require("../errors/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Неправильный Email или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });

    const cart = await Basket.create({ userId: user.id });

    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token, cartId: cart.id });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь с таким Email не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Введён неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);

    console.log("Авторизация прошла успешно!", token);
    console.log(user.id, user.email);
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);

    try {
      console.log(token);
    } catch (error) {
      console.error(error);
    }

    return res.status(200).json({ token, userId: req.user });
  }
}

module.exports = new UserController();
