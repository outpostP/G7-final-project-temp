const db = require('../../../models')
const Transaction = db.Transaction;
const TP = db.Transaction_Product;
const Product = db.Products;
const Category = db.Category;
const Cart = db.Cart;
const Cart_Product = db.Cart_Product;
const { Op } = require("sequelize");

const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    console.log(req.user)
    const {cartId} = req.user
    console.log('cart', cartId)
    
    try {
      await db.sequelize.transaction(async (t) => {
       
          const existingItem = await Cart_Product.findOne({ where: { cartId : cartId, productId: productId } }, { transaction: t });
  
          if (existingItem) {
            existingItem.quantity = quantity;
            await existingItem.save({ transaction: t });
            res.status(200).json({ message: 'Item updated successfully', item: existingItem });
          } else {
            const newItem = await Cart_Product.create(
              {
                cartId,
                productId,
                quantity,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              { transaction: t }
            );
  
            res.status(201).json({ message: 'Item added to cart successfully', item: newItem });
          }
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the cart' });
    }
  };

  async function transactionCashier (req, res) {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id, {
            where: {
              isPaid: false
            },
          include: [
            {
              model: TP,
              include: [
                {
                  model: Product
                }
              ],
            }
        ]
        });
    
        if (!transaction) {
          res.status(404).json({ error: 'Transaction not found' });
          return;
        }
    
        res.status(200).json({ data: transaction });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
}

async function resetCart(req, res) {
    try {
      const { id } = req.params;
      await db.sequelize.transaction(async (t) => {
        await Cart.update(
          {
            totalPrice: 0,
            totalItem: 0,
          },
          {
            where: { id: id },
            transaction: t,
          }
        );
  
        await Cart_Product.destroy({
          where: { cartId: id },
          transaction: t,
        });
      });
      res.status(200).json({ message: 'Cart deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting cart.' });
    }
  }
  
async function payment (req,res) {
    try {
        const {id} = req.params;
        await db.sequelize.transaction(async(t) =>{
            await Transaction.update(
                {
                    isPaid: true
                },
                {
                    where: {
                        id: id
                    },
                    transaction: t
                }
            )
        })
        res.status(200).json({message: 'Payment recorded'})
    } catch (error) {
        res.json(500).json({message: error})
    }
} 

const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

const buildProductFilter = (req) => {
    const { id_category, productName } = req.query;
    const where = { isActive: true };
    if (id_category) {
        where.categoryId = id_category; 
    }
    if (productName) {
        where.productName = { [Op.like]: `%${productName}%` };
    }
    return where;
};

const getProductSortOrder = (req) => {
    const sort = req.query.sort || 'desc';
    const field = req.query.field || 'createdAt'; // default sort field
    return sort === 'asc' ? [[field, 'ASC']] : [[field, 'DESC']];
};

const getProductsAndInclude = async (where, order, offset, limit) => {
    const includeOptions = [
        { model: Category },
    ];
    where.isActive = true;

    return await Product.findAll({
        where,
        order,
        offset,
        limit,
        include: includeOptions,
    });
};

async function getProduct(req, res){
    try {
        console.log(req.query)
        const { page, limit, offset } = getPaginationParams(req);
        const where = buildProductFilter(req);
        const order = getProductSortOrder(req);
  
        const totalProducts = await Product.count({ where });
        const totalPages = Math.ceil(totalProducts / limit);

        const size = (function() {
            if (totalPages > limit) {
                return limit;
            } else {
                return totalPages;
            }
        })();
        console.log(size)
  
        const products = await getProductsAndInclude(where, order, offset, limit);
  
        return res.status(200).json({
            message: "Products fetched successfully",
            data: {
                totalPages: totalPages,
                page: page,
                pageSize: size,
                products: products,
            }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Fetching products failed' });
    }
}

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
        include: [Cart, Product]
      });
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

  module.exports ={getProduct,payment,resetCart, transactionCashier, updateCart , deleteCartItems,createTransaction,cartTotal,getCartItems,getCart}