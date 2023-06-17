const Router = require("express");
const router = Router();
const reviewController = require("../controllers/reviewController");
const checkRole = require("../middlewares/checkRoleMiddleware");

router.post("/", reviewController.create);
router.delete("/", checkRole("ADMIN"), reviewController.delete);
router.get("/", reviewController.getAll);

module.exports = router;
