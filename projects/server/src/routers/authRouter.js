const router = require("express").Router();
const { authController } = require("../controllers");
const {
  validateRequest,
  validateLogin,
  validateRegistration,
} = require("../middleware/validator");
const {
  verifyToken,
  verifyAdmin,
  verifyCashierStatus,
} = require("../middleware/auth");

router.post(
  "/login",
  validateLogin,
  validateRequest,
  verifyCashierStatus,
  authController.userLogin
);
router.post(
  "/user",
  verifyToken,
  verifyAdmin,
  validateRegistration,
  validateRequest,
  authController.createCashier
);

module.exports = router;
