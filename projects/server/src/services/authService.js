const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const users = db.User;
const profiles = db.User_Profile;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
};

const validationLoginFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Login failed",
    message: message,
  });
};

const validationRegistrationFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Registration failed",
    message: message,
  });
};

const createNewCashier = async (username, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await db.sequelize.transaction(async (t) => {
    const userData = await users.create(
      {
        username,
        email,
        password: hashPassword,
      },
      { transaction: t }
    );
    const profileData = await profiles.create(
      {
        userId: userData.id,
      },
      { transaction: t }
    );

    return { userData, profileData };
  });
  return result;
};

module.exports = {
  generateToken,
  validationLoginFailed,
  validationRegistrationFailed,
  createNewCashier,
};
