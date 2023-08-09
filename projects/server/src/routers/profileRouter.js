const router = require("express").Router();
const { profileController } = require("../controllers");
const {
  validateRequest,
  validateUpdatePassword,
  validateUpdateStatus,
  validateUpdateUsernameEmail,
} = require("../middleware/validator");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

router.patch(
  "/user",
  verifyToken,
  verifyAdmin,
  validateUpdateUsernameEmail,
  validateRequest,
  profileController.updateUsernameEmail
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

router.get(
  "/allcashier",
  verifyToken,
  verifyAdmin,
  profileController.getAllCashier
);

module.exports = router;
