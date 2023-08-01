const db = require('../../../models');
const Transaction = db.Transaction;
const Product = db.Product;
const Category = db.Category;

const transactions = await Transaction.findAll({
    where: {
      date_time: date
    },
    include: [Cart, User]
  });

const generateReport = async (date) => {
    const report = transactions.map(transaction => {
      return {
        transactionId: transaction.id,
        total: transaction.total,
        date: transaction.date_time,
        cashier: transaction.Employee.name,
        items: transaction.Cart.CartItems.map(cartItem => {
          return {
            product: cartItem.Product.name,
            quantity: cartItem.quantity,
            price: cartItem.price
          };
        })
      };
    });
  
    return report;
  };


  