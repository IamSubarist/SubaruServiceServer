const Router = require("express");
const router = Router();
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware");

router.post("/", typeController.create);
router.delete("/", typeController.delete);
router.get("/", typeController.getAll);

module.exports = router;
