const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("../../models");
const { findEmail } = require("../services/commonService");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const users = db.User;
const profiles = db.User_Profile;

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  const verifier = process.env.JWT_KEY;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized token",
      message: "No token",
    });
  }

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "No bearer token",
      });
    }

    let verifiedUser = jwt.verify(token, verifier);
    if (!verifiedUser) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "Invalid token",
      });
    }
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Unauthorized token",
      message: err.message,
    });
  }
};

const verifyAdmin = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(404).json({
      error: "Unauthorized user",
      message: "User not an admin",
    });
  }
  next();
};

const verifyCashier = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    return res.status(404).json({
      error: "Unauthorized user",
      message: "User not a cashier",
    });
  }
  next();
};

const verifyCashierStatus = async (req, res, next) => {
  const { username } = req.body;
  const dataUser = await users.findOne({
    where: { username: username },
    include: [{ model: profiles }],
  });
  const userStatus = dataUser?.User_Profile?.isActive;
  const userRole = dataUser?.isAdmin;
  if (!userStatus && !userRole) {
    return res.status(404).json({
      error: "Unauthorized user",
      message: "User no longer active",
    });
  }
  next();
};
const verifyUserExist = async (req, res, next) => {
  const userEmail = req.user.email;
  const dataUser = await findEmail(userEmail);
  req.userReset = dataUser;
  if (!dataUser) {
    return res.status(404).json({
      error: "Unauthorized user",
      message: "User not found",
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyCashier,
  verifyCashierStatus,
  verifyUserExist,
};
