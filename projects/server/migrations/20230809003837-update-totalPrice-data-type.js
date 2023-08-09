'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Transactions', 'totalPrice', {
      type: Sequelize.DECIMAL(10, 2), // Adjust the precision and scale as needed
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Transactions', 'totalPrice', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
