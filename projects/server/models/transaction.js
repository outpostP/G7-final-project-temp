'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" ,
      onDelete: "NO ACTION",});
      this.belongsToMany(models.Products, {
        through: "Transaction_Product",
        foreignKey: "transactionId",
        onDelete: "NO ACTION",
      });
    }
  }
  Transaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalItem: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      modelName: "Transaction",
    }
  );
  return Transaction;
};
