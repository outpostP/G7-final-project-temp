const db = require("../../models");
const { authService } = require("../services");

const AuthController = {
  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await authService.findUser(username);
      const validatePassword = await authService.validatePassword(
        password,
        userData.password
      );

      let payload = {
        id: userData.id,
        isAdmin: userData.isAdmin,
      };

      const token = await authService.generateToken(payload);

      return res.status(200).json({
        message: "Login succeed",
        data: { userData, token },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Login failed",
        error: err.message,
      });
    }
  },
  createCashier: async (req, res) => {
    try {
    } catch (err) {}
  },
};

module.exports = AuthController;
