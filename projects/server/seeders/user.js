"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Abc@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        username: "admin1",
        email: "admin1@mailinator.com",
        password: hashedPassword,
        isAdmin: 1,
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
      },
      {
        username: "cashier1",
        email: "cashier1@mailinator.com",
        password: hashedPassword,
        isAdmin: 0,
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
      },
      {
        username: "cashier2",
        email: "cashier2@mailinator.com",
        password: hashedPassword,
        isAdmin: 0,
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
