const router = require("express").Router();
const { profileController } = require("../controllers");
const {
  validateRequest,
  validateUpdateUsername,
  validateUpdateEmail,
} = require("../middleware/validator");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.patch(
  "/username",
  verifyToken,
  verifyAdmin,
  validateUpdateUsername,
  validateRequest,
  profileController.updateUsername
);

router.patch(
  "/email",
  verifyToken,
  verifyAdmin,
  validateUpdateEmail,
  validateRequest,
  profileController.updateEmail
);

// router.patch(
//   "/password",
//   verifyToken,
//   verifyAdmin,
//   validateUpdatePassword,
//   validateRequest,
//   profileController.updatePassword
// );

module.exports = router;
