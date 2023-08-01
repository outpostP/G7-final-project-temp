const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const bcrypt = require("bcrypt");
const db = require("../../models");
const users = db.User;

const findUserId = async (id) => {
  return await users.findOne({ where: { id: id } });
};

const findUser = async (username) => {
  return await users.findOne({ where: { username: username } });
};

const findEmail = async (email) => {
  return await users.findOne({ where: { email: email } });
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  findUser,
  findEmail,
  findUserId,
  validatePassword,
};
