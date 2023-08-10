const db = require('../../../models')
const Transaction = db.Transaction;
const TP = db.Transaction_Product;
const Product = db.Products;
const Cart = db.Cart;
const Cart_Product = db.Cart_Product;


async function getCart(req, res) {
    const { cartId } = req.params;
  
    try {
      const cart = await Cart.findByPk(cartId);
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the cart' });
    }
  };
  async function getCartItems (req,res) {
    try {
        const cartItems = await Cart_Product.findAll({
          include: [Cart, Product] // Include both Cart and Product models in the query
        });
        // console.log(cartItems)
        res.status(200).json(cartItems);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching cart items' });
      }
};

async function cartTotal() {
    try {
      const carts = await Cart.findAll({
        attributes: ["id", "userId", "totalPrice", "totalItem", [sequelize.fn('SUM', sequelize.col('Cart_Product.quantity')), 'totalProductQuantity']],
        include: [{
          model: Cart_Product,
          attributes: []
        }],
        group: ["Cart.id"]
      });
  
      console.log(carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
}

  async function createTransaction(req, res) {
    try {
        await db.sequelize.transaction(async (t) => {
            const cartItemsObject = req.body;
            const cartItems = cartItemsObject.cartItems; 

            let totalItem = 0;
            let totalPrice = 0;

            for (const item of cartItems) {
                totalItem += item.quantity;
                totalPrice += item.quantity * item.Product.productPrice;
            }
            const transaction = await Transaction.create(
                {
                    userId: cartItems[0].Cart.userId,
                    totalPrice: totalPrice,
                    totalItem: totalItem,
                   
                },
                { transaction: t } 
            );
            for (const item of cartItems) {
                await TP.create(
                    {
                        transactionId: transaction.id,
                        productId: item.Product.id,
                        productPrice: item.Product.productPrice,
                        quantity: item.quantity,
                    },
                    { transaction: t } 
                );
            }
            res.status(201).json({ message: 'Cart items sent successfully', data: transaction.id });
        });

    } catch (error) {
        console.error('Error sending cart:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
  };
  async function deleteCartItems (req,res) {
    const { cartId, productId } = req.body;

    try {
      await db.sequelize.transaction(async (t) => {
        const existingItem = await Cart_Product.findOne({ where: { cartId, productId } });
  
        if (existingItem) {
          await existingItem.destroy({ transaction: t });
  
          return res.status(200).json({ message: 'Item deleted from cart successfully' });
        } else {
          return res.status(404).json({ message: 'Item not found in cart' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while deleting the item from cart' });
    }
  };

  module.exports = {deleteCartItems,createTransaction,cartTotal,getCartItems,getCart}