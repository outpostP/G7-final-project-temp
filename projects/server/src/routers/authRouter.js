const router = require("express").Router();
const { authController } = require("../controllers");
const {
  validateRequest,
  validateLogin,
  validateRegistration,
  validateForgotPassword,
  validateResetPassword,
} = require("../middleware/validator");
const {
  verifyToken,
  verifyAdmin,
  verifyCashierStatus,
  verifyUserExist,
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
router.put(
  "/forgotpass",
  validateForgotPassword,
  validateRequest,
  authController.forgotPassword
);
router.patch(
  "/resetpass",
  validateResetPassword,
  validateRequest,
  verifyToken,
  verifyUserExist,
  authController.resetPassword
);

module.exports = router;
