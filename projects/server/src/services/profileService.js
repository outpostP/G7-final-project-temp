const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const bcrypt = require("bcrypt");
const db = require("../../models");
const fs = require("fs");
const { Op } = require("sequelize");
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

const getAllCashier = async (
  pageSize,
  offset,
  sortBy,
  searchUsername,
  isAdmin
) => {
  const result = await db.sequelize.transaction(async (t) => {
    const queryOptions = {
      attributes: [
        "id",
        "username",
        "email",
        "isAdmin",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: profiles,
          attributes: ["id", "userId", "avatar", "isActive"],
        },
      ],
      limit: pageSize,
      offset: offset,
      order: [["createdAt", sortBy]],
      where: {
        isAdmin: isAdmin,
      },
    };

    if (searchUsername) {
      queryOptions.where.username = {
        [Op.like]: `%${searchUsername}%`,
      };
    }

    return await users.findAll(queryOptions, { transaction: t });
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

const validationDataCashierFailed = async (res, statusCode, message) => {
  return res.status(statusCode).json({
    error: "Update data cashier failed",
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
  updateNewEmail,
  validationDataCashierFailed,
  validationPasswordFailed,
  updateNewPassword,
  validationStatusFailed,
  updateUserStatus,
  getAllCashier,
  updateUserAvatar,
  validationAvatarFailed,
  deleteOldImage,
};
