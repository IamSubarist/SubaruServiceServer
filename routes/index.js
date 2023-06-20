const Router = require("express");
const router = Router();
const userRouter = require("./userRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");
const cartRouter = require("./cartRouter");
const mailRouter = require("./mailRouter");
const orderMailRouter = require("./orderMailRouter");
const newsRouter = require("./newsRouter");
const reviewRouter = require("./reviewRouter");
const orderRouter = require("./orderRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/cart", cartRouter);
router.use("/mail", mailRouter);
router.use("/orderMail", orderMailRouter);
router.use("/news", newsRouter);
router.use("/review", reviewRouter);
router.use("/order", orderRouter);

module.exports = router;
