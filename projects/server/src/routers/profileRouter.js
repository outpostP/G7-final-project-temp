const router = require("express").Router();
const { profileController } = require("../controllers");
const {
  validateRequest,
  validateUpdateUsername,
  validateUpdateEmail,
  validateUpdatePassword,
  validateUpdateStatus,
  validateUpdateAvatar,
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

router.patch(
  "/password",
  verifyToken,
  verifyAdmin,
  validateUpdatePassword,
  validateRequest,
  profileController.updatePassword
);

router.patch(
  "/status",
  verifyToken,
  verifyAdmin,
  validateUpdateStatus,
  validateRequest,
  profileController.updateStatus
);

router.post(
  "/avatar",
  verifyToken,
  verifyAdmin,
  profileController.updateAvatar
);

module.exports = router;
