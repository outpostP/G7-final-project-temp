const db = require("../../models");
const { authService } = require("../services");

const AuthController = {
  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await authService.findUser(username);
      if (!userData) {
        return authService.validationFailed(res, 404, "User not found");
      }

      const validatePassword = await authService.validatePassword(
        password,
        userData.password
      );
      if (!validatePassword) {
        return authService.validationFailed(res, 400, "Invalid password");
      }

      let payload = {
        id: userData.id,
        isAdmin: userData.isAdmin,
      };

      const token = await authService.generateToken(payload);

      return res.status(200).json({
        success: "Login succeed",
        data: { userData, token },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Login failed",
        message: err.message,
      });
    }
  },
  createCashier: async (req, res) => {
    try {
    } catch (err) {}
  },
};

module.exports = AuthController;
