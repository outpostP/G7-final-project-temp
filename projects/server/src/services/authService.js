const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const users = db.User;
const profiles = db.User_Profile;
const carts = db.Cart;
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

const createUserCashier = async (username, email, password) => {
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
    return userData;
  });
  return result;
};

const createProfileCashier = async (id) => {
  const result = await db.sequelize.transaction(async (t) => {
    const profileData = await profiles.create(
      {
        userId: id,
      },
      { transaction: t }
    );
    return profileData;
  });
  return result;
};

const createCartCashier = async (id) => {
  const result = await db.sequelize.transaction(async (t) => {
    const cartData = await carts.create(
      {
        userId: id,
      },
      { transaction: t }
    );
    return cartData;
  });
  return result;
};

const createNewCashier = async (username, email, password) => {
  try {
    const userData = await createUserCashier(username, email, password);
    await createProfileCashier(userData.id);
    await createCartCashier(userData.id);
    return userData;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user");
  }
};

const updatePassword = async (id, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await db.sequelize.transaction(async (t) => {
      const userData = await users.update(
        {
          password: hashPassword,
        },
        { where: { id: id } },
        { transaction: t }
      );
      return userData;
    });
    return result;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user");
  }
};

module.exports = {
  generateToken,
  validationLoginFailed,
  validationRegistrationFailed,
  createNewCashier,
  updatePassword,
};
