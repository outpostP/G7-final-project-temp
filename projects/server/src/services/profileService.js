const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const bcrypt = require("bcrypt");
const db = require("../../models");
const fs = require("fs");
const users = db.User;
const profiles = db.User_Profile;

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

const updateNewPassword = async (userId, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await db.sequelize.transaction(async (t) => {
    return await users.update(
      {
        password: hashPassword,
      },
      { where: { id: userId } },
      { transaction: t }
    );
  });
  return result;
};

const updateUserStatus = async (userId, status) => {
  const result = await db.sequelize.transaction(async (t) => {
    return await profiles.update(
      {
        isActive: status,
      },
      { where: { userId: userId } },
      { transaction: t }
    );
  });
  return result;
};

const updateUserAvatar = async (userId, pathAvatar) => {
  const result = await db.sequelize.transaction(async (t) => {
    return await profiles.update(
      {
        avatar: pathAvatar,
      },
      { where: { userId: userId } },
      { transaction: t }
    );
  });
  return result;
};

const deleteOldImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Previous avatar deleted successfully");
  });
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

const validationPasswordFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update password failed",
    message: message,
  });
};

const validationStatusFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update status failed",
    message: message,
  });
};

const validationAvatarFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update avatar failed",
    message: message,
  });
};

module.exports = {
  updateNewUsername,
  validationUsernameFailed,
  updateNewEmail,
  validationEmailFailed,
  validationPasswordFailed,
  updateNewPassword,
  validationStatusFailed,
  updateUserStatus,
  updateUserAvatar,
  validationAvatarFailed,
  deleteOldImage,
};
