const db = require("../../models");
const { commonService, profileService } = require("../services");

const ProfileController = {
  updateUsername: async (req, res) => {
    try {
      const { currentUsername, newUsername } = req.body;
      const foundCurrentUsername = await commonService.findUser(
        currentUsername
      );
      if (!foundCurrentUsername) {
        return profileService.validationUsernameFailed(
          res,
          404,
          "User not found"
        );
      }

      const foundNewUsername = await commonService.findUser(newUsername);
      if (foundNewUsername) {
        return profileService.validationUsernameFailed(
          res,
          400,
          "New user exists"
        );
      }

      await profileService.updateNewUsername(
        foundCurrentUsername.id,
        newUsername
      );
      return res.status(200).json({
        success: "Update username succeed",
        username: newUsername,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update username failed",
        message: err.message,
      });
    }
  },

  updateEmail: async (req, res) => {
    try {
      const { currentEmail, newEmail } = req.body;
      const foundCurrentEmail = await commonService.findEmail(currentEmail);
      if (!foundCurrentEmail) {
        return profileService.validationEmailFailed(res, 404, "User not found");
      }

      const foundNewEmail = await commonService.findEmail(newEmail);
      if (foundNewEmail) {
        return profileService.validationEmailFailed(
          res,
          400,
          "New user exists"
        );
      }

      await profileService.updateNewEmail(foundCurrentEmail.id, newEmail);
      return res.status(200).json({
        success: "Update email succeed",
        email: newEmail,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update email failed",
        message: err.message,
      });
    }
  },
};

module.exports = ProfileController;
