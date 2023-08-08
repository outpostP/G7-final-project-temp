'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_Product extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
        onDelete: "NO ACTION", // Set the ON DELETE behavior to CASCADE for Transaction
      });
      this.belongsTo(models.Products, {
        foreignKey: "productId",
        onDelete: "NO ACTION", // Set the ON DELETE behavior to CASCADE for Products
      });
    }
  }
  Transaction_Product.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Transaction_Product",
    }
  );
  return Transaction_Product;
};
