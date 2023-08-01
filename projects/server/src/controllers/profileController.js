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

  updatePassword: async (req, res) => {
    try {
      const { cashierId, currentPassword, password } = req.body;

      const userData = await commonService.findUserId(cashierId);
      if (!userData) {
        return profileService.validationPasswordFailed(
          res,
          404,
          "User not found"
        );
      }

      const validatePassword = await commonService.validatePassword(
        currentPassword,
        userData.password
      );
      if (!validatePassword) {
        return profileService.validationPasswordFailed(
          res,
          400,
          "Invalid password"
        );
      }
      await profileService.updateNewPassword(cashierId, password);
      return res.status(200).json({
        success: "Update password succeed",
        username: userData.username,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update password failed",
        message: err.message,
      });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { cashierId, isActive } = req.body;

      const userData = await commonService.findUserId(cashierId);
      if (!userData) {
        return profileService.validationStatusFailed(
          res,
          404,
          "User not found"
        );
      }

      await profileService.updateUserStatus(cashierId, isActive);
      return res.status(200).json({
        success: "Update status succeed",
        username: userData.username,
        isActive,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update status failed",
        message: err.message,
      });
    }
  },

  updateAvatar: async (req, res) => {
    try {
      const avatarPath = req.file.path;
      const { cashierId } = req.body;
      console.log(avatarPath, cashierId);

      if (!avatar) {
        return profileService.validationAvatarFailed(
          res,
          400,
          "Avatar image is required"
        );
      }
      if (!cashierId) {
        return profileService.validationAvatarFailed(
          res,
          400,
          "cashierId is required"
        );
      }

      const userData = await commonService.findProfileUserId(cashierId);
      if (!userData) {
        return profileService.validationAvatarFailed(
          res,
          404,
          "User not found"
        );
      }

      await profileService.updateUserAvatar(cashierId, avatarPath);

      profileService.deleteOldImage(userData.avatar);

      return res.status(200).json({
        success: "Update avatar succeed",
        avatarPath,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update avatar failed",
        message: err.message,
      });
    }
  },
};

module.exports = ProfileController;
