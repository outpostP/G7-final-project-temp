const router = require("express").Router();
const { authController } = require("../controllers");

router.post("/login", authController.userLogin);

module.exports = router;
