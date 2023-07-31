'use strict';
const {
  Model
} = require('DataTypes');
module.exports = (DataTypes, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'userId'});
      this.belongsToMany(models.Products, {through:'Transaction_Product', foreignKey:'transactionId'})
    }
  }
  Transaction.init({
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
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    DataTypes,
    modelName: 'Transaction',
  });
  return Transaction;
};