"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin1",
        email: "admin1@mailinator.com",
        password:
          "$2b$10$aSsG1v5vHv/FKfY0jhpOjOrORXXr2rruZwa6X16EYqleY.ULLg7oe",
        isAdmin: 1,
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
      },
      {
        username: "cashier1",
        email: "cashier1@mailinator.com",
        password:
          "$2b$10$aSsG1v5vHv/FKfY0jhpOjOrORXXr2rruZwa6X16EYqleY.ULLg7oe",
        isAdmin: 0,
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
      },
      {
        username: "cashier2",
        email: "cashier2@mailinator.com",
        password:
          "$2b$10$aSsG1v5vHv/FKfY0jhpOjOrORXXr2rruZwa6X16EYqleY.ULLg7oe",
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
