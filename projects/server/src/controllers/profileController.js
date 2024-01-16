const { commonService, profileService } = require("../services");
const db = require("../../models");
const users = db.User;

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
      const totalEmployee = await users.count({ where: { isAdmin: false } });
      const totalPages = Math.ceil(totalEmployee / pageSize);
      console.log(totalPages);

      return res.status(200).json({
        message: "Get All Cashier Succeed",
        pageNumber,
        pageSize,
        sortBy,
        searchUsername,
        totalPages,
        data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: "Get All Cashier Failed",
        message: err.message,
      });
    }
  },

  updateUsernameEmail: async (req, res) => {
    try {
      const { cashierId, username, email } = req.user;

      const userData = await commonService.findUserId(cashierId);
      if (!userData) {
        return profileService.validationDataCashierFailed(
          res,
          404,
          "User not found"
        );
      }

      const usernameData = await commonService.findUser(username);
      if (usernameData) {
        return profileService.validationDataCashierFailed(
          res,
          400,
          "Username exist"
        );
      }

      const emailData = await commonService.findEmail(email);
      if (emailData) {
        return profileService.validationDataCashierFailed(
          res,
          400,
          "Email exist"
        );
      }

      await profileService.updateUsernameEmail(cashierId, username, email);
      return res.status(200).json({
        success: "Update data succeed",
        username: username,
        email: email,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Update data failed",
        message: err.message,
      });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { cashierId, password } = req.user;

      const userData = await commonService.findUserId(cashierId);
      if (!userData) {
        return profileService.validationPasswordFailed(
          res,
          404,
          "User not found"
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
      const { cashierId, isActive } = req.user;

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
      const cashierId = req.body.cashierId
    
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