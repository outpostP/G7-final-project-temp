const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const users = db.User;

const findUser = async (username) => {
  return await users.findOne({ where: { username: username } });
};

const findEmail = async (email) => {
  return await users.findOne({ where: { email: email } });
};

module.exports = {
  findUser,
  findEmail,
};
