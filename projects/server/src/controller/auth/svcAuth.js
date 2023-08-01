const path = require("path");
require("dotenv").config({
    path: path.resolve("../.env"),
});
const db = require('../../models');
const users = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require('fs');
  
  
  const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };
  
  const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_LOGIN, { expiresIn: '240h' });
  };

  const verifyToken = async (token) => {
    try {
        const verifier = process.env.JWT_KEY_VERIFY;
        const decode = jwt.verify(token, verifier);
        return decode.id;
    } catch (err) {
        throw new Error('Invalid token');
    }
};

const getUserByX = async (x, xVal) => {
    const user = await users.findOne({ where: { [x]: xVal } });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};


async function getUserByEmail(email) {
    try {
        const getemail = await users.findOne({
         where: {
              email: email
        }
        });
        return getemail
    }
    catch (err) {
        console.error('error fetching the user', err)
        throw err
    }
};

const deleteOldAvatar = (imgProfile, callback) => {
    fs.unlink(imgProfile, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.warn('Avatar file not found:', imgProfile);
            } else {
                console.error('Error deleting old avatar:', err);
            }
        }
        if (typeof callback === 'function') {
            callback(err);
        }
    });
};

const updateUserAvatar = async (userId, avatarPath) => {
    try {
        await db.sequelize.transaction(async (t) => {
            await users.update(
                {
                    imgProfile: avatarPath
                },
                {
                    where: {
                        id: userId
                    }
                },
                { transaction: t }
            );
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to update user avatar');
    }
};

const getUserInstance = async (req) => {
    try {
        return await users.findByPk(req.user.id);
    } catch (err) {
        throw new Error('Failed to get user instance');
    }
};

const executeTransaction = async (id,field, update) => {
    try {
        await db.sequelize.transaction(async (t) => {
            await users.update(
                { [field]: update },
                { where: { id: id } },
                { transaction: t }
            );
        });
    } catch (error) {
        throw new Error(`Failed to update in transaction: ${error.message}`);
    }
};

module.exports = {executeTransaction, updateUserAvatar, deleteOldAvatar, getUserByEmail, validatePassword, generateToken, verifyToken, getUserByX,}