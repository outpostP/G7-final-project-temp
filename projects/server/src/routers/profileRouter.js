const router = require("express").Router();
const { profileController } = require("../controllers");
const {
  validateRequest,
  validateUpdateUsername,
  validateUpdateEmail,
  validateUpdatePassword,
  validateUpdateStatus,
} = require("../middleware/validator");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

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
  multerUpload.single("avatar"),
  profileController.updateAvatar
);

module.exports = router;
