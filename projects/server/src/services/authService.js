const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const users = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const findUser = async (user) => {
  return await users.findOne({ where: { username: user } });
};

const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const validationFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Login failed",
    message: message,
  });
};

module.exports = {
  findUser,
  generateToken,
  validatePassword,
  validationFailed,
};
