const Router = require("express");
const router = Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middlewares/checkRoleMiddleware");

router.post("/", brandController.create);
router.delete("/", brandController.delete);
router.get("/", brandController.getAll);

module.exports = router;
