const router = require("express").Router();
const { profileController } = require("../controllers");

router.post("/user", profileController.updateProfile);

module.exports = router;
