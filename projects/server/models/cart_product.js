'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Product extends Model {
    static associate(models) {
      this.belongsTo(models.Cart, { foreignKey: "cartId" });
      this.belongsTo(models.Products, { foreignKey: "productId" });
    }
  }
  Cart_Product.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
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
      modelName: "Cart_Product",
    }
  );
  return Cart_Product;
};
