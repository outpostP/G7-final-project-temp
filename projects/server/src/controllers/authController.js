const SendEmail = require("../helpers/transporter");
const { authService, commonService } = require("../services");

const AuthController = {
  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await commonService.findUser(username);
      if (!userData) {
        return authService.validationLoginFailed(res, 404, "User not found");
      }
      console.log(userData.dataValues)
      const userId = userData.dataValues.id;
      console.log('id',userId)
      let userCart;
      let userProfile;
      if (!userData.dataValues.isAdmin) {

         userCart = await commonService.findUserCart(userId);
         userProfile = await commonService.findProfileUserId(userId);
      }
      // console.log(userCart)

      const validatePassword = await commonService.validatePassword(
        password,
        userData.password
      );
      if (!validatePassword) {
        return authService.validationLoginFailed(res, 400, "Invalid password");
      }
      let payload;
      if (!userData.isAdmin) {
         payload = {
          id: userId,
          isAdmin: userData.isAdmin,
          username:userCart.username,
          cartId: userCart.id,
          avatar: userProfile.avatar,
        };
      } else {
        payload = {
          id: userId,
          isAdmin: userData.isAdmin,
      }
    }
      const token = await authService.generateToken(payload);
      if (userCart) {
        return res.status(200).json({
          success: "Login succeed",
          data: {
            id: userId,
            username: userData.username,
            isAdmin: userData.isAdmin,
            avatar: userProfile.avatar,
            token,
          },
        });
      } else {
        return res.status(200).json({
          success: "Login succeed",
          data: {
            id: userId,
            username: userData.username,
            isAdmin: userData.isAdmin,
            token,
          },
        });
      }
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
        user: userData,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Registration failed",
        message: err.message,
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const emailExist = await commonService.findEmail(email);
  
      if (!emailExist) {
        return res.status(404).json({
          error: "Email not found in the server.",
          message: "Unregistered email.",
        });
      }
  
      let payload = {
        email: email,
      };
      const token = await authService.generateToken(payload);
      SendEmail.verifyEmail(email, token);
  
      return res.status(200).json({
        success: "Reset password succeed, Please verify from email!",
        token,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: "Reset password failed",
        message: err.message,
      });
    }
  },
  

  resetPassword: async (req, res) => {
    try {
      const { id, username } = req.userReset;
      const { password } = req.body;
      await authService.updatePassword(id, password);
      return res.status(200).json({
        success: "Reset password succeed",
        username,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: "Reset password failed",
        message: err.message,
      });
    }
  },
};

module.exports = AuthController;