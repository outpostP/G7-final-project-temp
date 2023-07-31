const router = require("express").Router();
const { authController } = require("../controllers");
const {
  validateRequest,
  validateLogin,
  validateRegistration,
} = require("../middleware/validator");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.post("/login", validateLogin, validateRequest, authController.userLogin);
router.post(
  "/user",
  verifyToken,
  verifyAdmin,
  validateRegistration,
  validateRequest,
  authController.createCashier
);

module.exports = router;
