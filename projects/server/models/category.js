'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Products, { foreignKey: "categoryId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
    }
  }
  Category.init(
    {
      categoryName: {
        type: DataTypes.STRING,
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true

      }
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
