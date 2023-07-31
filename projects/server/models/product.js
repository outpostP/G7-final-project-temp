"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cart_Product, { foreignKey: "productId" });
      this.hasMany(models.Transaction_Product, { foreignKey: "productId" });
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      productName: {
        type: DataTypes.STRING,
      },
      productDescription: {
        type: DataTypes.STRING,
      },
      productPrice: {
        type: DataTypes.INTEGER,
      },
      productImage: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
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
      modelName: "Product",
    }
  );
  return Product;
};
