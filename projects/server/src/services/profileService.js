const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const users = db.User;

const updateNewUsername = async (userId, newUsername) => {
  const result = await db.sequelize.transaction(async (t) => {
    return await users.update(
      {
        username: newUsername,
      },
      { where: { id: userId } },
      { transaction: t }
    );
  });
  return result;
};

const updateNewEmail = async (userId, newEmail) => {
  const result = await db.sequelize.transaction(async (t) => {
    return await users.update(
      {
        email: newEmail,
      },
      { where: { id: userId } },
      { transaction: t }
    );
  });
  return result;
};

const validationUsernameFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update username failed",
    message: message,
  });
};

const validationEmailFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update email failed",
    message: message,
  });
};

module.exports = {
  updateNewUsername,
  validationUsernameFailed,
  updateNewEmail,
  validationEmailFailed,
};
