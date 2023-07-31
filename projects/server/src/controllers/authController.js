const db = require("../../models");
const { authService, commonService } = require("../services");

const AuthController = {
  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await commonService.findUser(username);
      if (!userData) {
        return authService.validationLoginFailed(res, 404, "User not found");
      }

      const validatePassword = await authService.validatePassword(
        password,
        userData.password
      );
      if (!validatePassword) {
        return authService.validationLoginFailed(res, 400, "Invalid password");
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
      const { username, email, password } = req.body;
      const foundUser = await commonService.findUser(username);
      const foundEmail = await commonService.findEmail(email);
      if (foundUser || foundEmail) {
        return authService.validationRegistrationFailed(
          res,
          400,
          "User exists"
        );
      }

      const userData = await authService.createNewCashier(
        username,
        email,
        password
      );
      return res.status(200).json({
        success: "Registration succeed",
        data: { userData },
      });
    } catch (err) {
      return res.status(500).json({
        error: "Registration failed",
        message: err.message,
      });
    }
  },
};

module.exports = AuthController;
