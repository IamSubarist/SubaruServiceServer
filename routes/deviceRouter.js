const Router = require("express");
const router = Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../middlewares/checkRoleMiddleware");

router.post("/", deviceController.create);
router.delete("/:id", deviceController.delete);
router.get("/search", deviceController.search); // Перенесен выше
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;
