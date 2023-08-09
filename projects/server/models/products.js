"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      this.belongsToMany(models.Cart, {
        through: "Cart_Product",
        foreignKey: "productId",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      });
      this.belongsToMany(models.Transaction, {
        through: "Transaction_Product",
        foreignKey: "productId",
        onDelete: "NO ACTION",
      });
      this.belongsTo(models.Category, { foreignKey: "categoryId" ,
      onDelete: "NO ACTION",});
    }
  }
  Products.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      modelName: "Products",
    }
  );
  return Products;
};
