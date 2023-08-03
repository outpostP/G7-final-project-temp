const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const bcrypt = require("bcrypt");
const db = require("../../models");
const users = db.User;
const profiles = db.User_Profile;
const carts = db.Cart;

const findUserId = async (id) => {
  return await users.findOne({ where: { id: id } });
};

const findProfileUserId = async (id) => {
  return await profiles.findOne({ where: { userId: id } });
};

const findUser = async (username) => {
  return await users.findOne({ where: { username: username } });
};

const findUserCart = async (id) => {
  return await carts.findOne({ where: { userId: id } });
};

const findEmail = async (email) => {
  return await users.findOne({ where: { email: email } });
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  findUser,
  findUserCart,
  findProfileUserId,
  findEmail,
  findUserId,
  validatePassword,
};
