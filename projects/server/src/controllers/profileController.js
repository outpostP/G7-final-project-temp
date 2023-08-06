const { commonService, profileService } = require("../services");

const ProfileController = {
  getAllCashier: async (req, res) => {
    try {
      const pageNumber = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.size) || 10;
      const isAdmin = req.query.isAdmin ? JSON.parse(req.query.isAdmin) : false;
      const sortBy = req.query.sort || "DESC";
      const offset = (pageNumber - 1) * pageSize;
      const searchUsername = req.query.searchByUsername;

      const data = await profileService.getAllCashier(
        pageSize,
        offset,
        sortBy,
        searchUsername,
        isAdmin
      );
      if (!data) {
        return profileService.validationDataCashierFailed(
          res,
          400,
          "Failed to get data"
        );
      }
      return res.status(200).json({
        message: "Get All Cashier Succeed",
        pageNumber,
        pageSize,
        sortBy,
        searchUsername,
        data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: "Get All Cashier Failed",
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

      if (!avatarPath) {
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
