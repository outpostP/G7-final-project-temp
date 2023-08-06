const db = require("../../../models");
const fs = require("fs");
const path = require("path");
const Transaction = db.Transaction;
const TP = db.Transaction_Product;
const Product = db.Products;
const Category = db.Category;
const Users = db.User;
const Profile = db.User_Profile;
const Cart = db.Cart;
const Cart_Product = db.Cart_Product;
const { Op } = require("sequelize");

async function getCategory(req, res) {
  try {
    const category = await Category.findAll();
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ message: "error fetching categories" });
  }
}

async function addCategory (req, res) {
    try {
        const {category} = req.body
         return db.sequelize.transaction(async (t) => {
               const addcategory = await Category.create(
                 {
                    categoryName: category
                 },
                 { transaction: t }
            );
            res.json({ message: 'Category added successfully', category: addcategory });
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
    
async function getAdmin(req, res) {
  try {
    const user = await Users.findAll();
    return res.status(200).json({ data: user });
  } catch (err) {
    console.error("error", err);
    return res.status(500).json({ message: err.message });
  }
}

async function updateCategory (req, res) {
    try {
        const {id} = req.params;
        const {category} = req.body;
        return db.sequelize.transaction(async (t) => {
            const updatedCategory = await Category.update(
                {
                    categoryName: category
                },
                {
                    where: { id: id },
                    transaction: t
                }
            );
            if (updatedCategory[0] === 0) {
                res.status(404).json({ message: 'Category not found' });
            } else {
                res.json({ message: 'Category updated successfully', category: updatedCategory });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    };
};

async function getCashierAll(req,res) {
    try {
        const cashier = await Users.findAll({
            include : [
                {
                    model: Profile,
                    where : {isActive: true},
                }
            ]
        });
        return res.status(200).json({message:' fetching succeed', data: cashier});
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    };
};

async function addCashier(req, res) {
    try {
        const { username, email, password } = req.body;
        return db.sequelize.transaction(async (t) => {
            const addingCashier = await Users.create(
                {
                    username,
                    email,
                    password,
                },
                { transaction: t }
            );

            console.log(addingCashier);

            // Creating cart and profile within the same transaction
            await createCart(addingCashier.id, t);
            await createProfile(addingCashier.id, t);

            res.status(200).json({ message: 'cashier added', data: addingCashier });
        });
    } catch (err) {
        console.error('Error adding cashier:', err);
        return res.status(500).json({ message: err.message });
    }
};

async function createCart(id, transaction) {
    try {
        const addcart = await Cart.create(
            {
                userId: id,
            },
            { transaction }
        );

        return addcart;
    } catch (err) {
        console.error('Error creating cart:', err);
        throw new Error('Failed to create cart');
    }
};

async function createProfile(id, transaction) {
    try {
        console.log('Creating profile for user ID:', id);
        const profile = await Profile.create(
            {
                userId: id,
            },
            { transaction }
        );

        console.log('Profile created:', profile);
        return profile;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw new Error("Failed to create user's profile");
    }
}


async function addCashier(req, res) {
  try {
    const { username, email, password } = req.body;
    return db.sequelize.transaction(async (t) => {
      const addingCashier = await Users.create(
        {
          username,
          email,
          password,
        },
        { transaction: t }
      );

      console.log(addingCashier);

      // Creating cart and profile within the same transaction
      await createCart(addingCashier.id, t);
      await createProfile(addingCashier.id, t);

      res.status(200).json({ message: "cashier added", data: addingCashier });
    });
  } catch (err) {
    console.error("Error adding cashier:", err);
    return res.status(500).json({ message: err.message });
  }
}

async function createCart(id, transaction) {
  try {
    const addcart = await Cart.create(
      {
        userId: id,
      },
      { transaction }
    );

    return addcart;
  } catch (err) {
    console.error("Error creating cart:", err);
    throw new Error("Failed to create cart");
  }
}

async function createProfile(id, transaction) {
  try {
    console.log("Creating profile for user ID:", id);
    const profile = await Profile.create(
      {
        userId: id,
      },
      { transaction }
    );

    console.log("Profile created:", profile);
    return profile;
  } catch (err) {
    console.error("Error creating profile:", err);
    throw new Error("Failed to create user's profile");
  }
}
// `http://localhost:8000/${product.productImage}`
async function getProduct(req, res) {
  try {
    console.log(req.query);
    const { page, limit, offset } = getPaginationParams(req);
    const where = buildProductFilter(req);
    const order = getProductSortOrder(req);

    const totalProducts = await Product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    const size = (function () {
      if (totalPages > limit) {
        return limit;
      } else {
        return totalPages;
      }
    })();
    console.log(size);

    const products = await getProductsAndInclude(where, order, offset, limit);

    return res.status(200).json({
      message: "Products fetched successfully",
      data: {
        totalPages: totalPages,
        page: page,
        pageSize: size,
        products: products,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Fetching products failed" });
  }
}

async function getProductAdmin(req, res) {
  try {
    console.log(req.query);
    const { page, limit, offset } = getPaginationParams(req);
    const where = buildProductFilterAdmin(req);
    const order = getProductSortOrder(req);

    const totalProducts = await Product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    const size = (function () {
      if (totalPages > limit) {
        return limit;
      } else {
        return totalPages;
      }
    })();
    console.log(size);

    const products = await getProductsAndInclude(where, order, offset, limit);

    return res.status(200).json({
      message: "Products fetched successfully",
      data: {
        totalPages: totalPages,
        page: page,
        pageSize: size,
        products: products,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Fetching products failed" });
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
    where.categoryId = id_category; // <- Update the column name to 'categoryId'
  }
  if (productName) {
    where.productName = { [Op.like]: `%${productName}%` };
  }
  return where;
};

const buildProductFilterAdmin = (req) => {
  const { id_category, productName } = req.query;
  const where = {};
  if (id_category) {
    where.categoryId = id_category; // <- Update the column name to 'categoryId'
  }
  if (productName) {
    where.productName = { [Op.like]: `%${productName}%` };
  }
  return where;
};

const getProductSortOrder = (req) => {
  const sort = req.query.sort || "desc";
  return sort === "asc" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
};

const getProductsAndInclude = async (where, order, offset, limit) => {
  const includeOptions = [{ model: Category }];

  return await Product.findAll({
    where,
    order,
    offset,
    limit,
    include: includeOptions,
  });
};

async function addProduct(req, res) {
  try {
    const { productname, productprice, productdes, category } = req.body;
    return db.sequelize.transaction(async (t) => {
      const addproduct = await Product.create(
        {
          productName: productname,
          productPrice: productprice,
          productDescription: productdes,
          productImage: req.file.path,
          categoryId: category,
        },
        { transaction: t }
      );
      res
        .status(200)
        .json({ message: "Product added successfully", category: addproduct });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getProductId(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: Category, // Include the Category model
    });

    if (!product) {
      return res.json({ error: "Product not found" });
    }

    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

async function getCategoryId(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.json({ error: "Category not found" });
    }

    return res.json(category);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

const deleteCategory = async (req, res) => {
  const category_id = req.params.id;
  try {
    await Product.update(
      { category_id: null },
      {
        where: { id: category_id },
      }
    );

    await Category.destroy({ where: { category_id: category_id } });

    res
      .status(200)
      .send(
        `Category ${category_id} was deleted successfully and all related products were set to category_id NULL.`
      );
  } catch (error) {
    res.status(500).send("Could not delete category. Error: " + error);
  }
};

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { productname, productprice, productdes, category } = req.body;
    const product = await Product.findByPk(id);
    let updateData = {
      productName: productname,
      productPrice: productprice,
      productDescription: productdes,
      categoryId: category,
    };
    if (req.file && req.file.path) {
      updateData.productImage = req.file.path;
    }
    if (
      updateData.productImage &&
      product.productImage &&
      fs.existsSync(product.productImage)
    ) {
      fs.unlinkSync(product.productImage);
    }
    return db.sequelize.transaction(async (t) => {
      const updateprod = await Product.update(
        updateData,
        {
          where: { id: id },
        },
        { transaction: t }
      );
      res
        .status(200)
        .json({ message: "Product updated successfully", product: updateData });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const updateCart = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    await db.sequelize.transaction(async (t) => {
      const existingItem = await Cart_Product.findOne(
        { where: { cartId, productId } },
        { transaction: t }
      );

      if (existingItem) {
        // Item already exists, update its quantity
        existingItem.quantity = quantity;
        await existingItem.save({ transaction: t });
        res
          .status(200)
          .json({ message: "Item updated successfully", item: existingItem });
      } else {
        // Item does not exist, create a new item in the cart
        const newItem = await Cart_Product.create(
          {
            cartId,
            productId,
            quantity,
            createdAt: new Date(), // Set the createdAt timestamp
            updatedAt: new Date(), // Set the updatedAt timestamp
          },
          { transaction: t }
        );

        res
          .status(201)
          .json({ message: "Item added to cart successfully", item: newItem });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the cart" });
  }
};

async function deleteCartItems(req, res) {
  const { cartId, productId } = req.body;

  try {
    await db.sequelize.transaction(async (t) => {
      const existingItem = await Cart_Product.findOne({
        where: { cartId, productId },
      });

      if (existingItem) {
        await existingItem.destroy({ transaction: t });

        return res
          .status(200)
          .json({ message: "Item deleted from cart successfully" });
      } else {
        return res.status(404).json({ message: "Item not found in cart" });
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the item from cart" });
  }
}

async function getCart(req, res) {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the cart" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username } });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const cart = await Cart.findOne({ where: { userId: user.id } });

  if (user.isAdmin) {
    res.json({ userId: user.id, isAdmin: true });
  } else {
    res.json({ userId: user.id, cartId: cart.id, isAdmin: false });
  }
}

async function getCartItems(req, res) {
  try {
    const cartItems = await Cart_Product.findAll({
      include: [Cart, Product], // Include both Cart and Product models in the query
    });
    // console.log(cartItems)
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching cart items" });
  }
}

async function cartTotal() {
  try {
    const carts = await Cart.findAll({
      attributes: [
        "id",
        "userId",
        "totalPrice",
        "totalItem",
        [
          sequelize.fn("SUM", sequelize.col("Cart_Product.quantity")),
          "totalProductQuantity",
        ],
      ],
      include: [
        {
          model: Cart_Product,
          attributes: [],
        },
      ],
      group: ["Cart.id"],
    });

    // Each cart will have a property "totalProductQuantity" representing the sum of product quantities in that cart.
    console.log(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
  }
}

async function createTransaction(req, res) {
  try {
    await db.sequelize.transaction(async (t) => {
      const cartItemsObject = req.body;
      const cartItems = cartItemsObject.cartItems; // Extract the cartItems array

      // Calculate totalItem and totalPrice
      let totalItem = 0;
      let totalPrice = 0;

      for (const item of cartItems) {
        totalItem += item.quantity;
        totalPrice += item.quantity * item.Product.productPrice;
      }

      // Create a new Transaction entry
      const transaction = await Transaction.create(
        {
          userId: cartItems[0].Cart.userId,
          totalPrice: totalPrice,
          totalItem: totalItem,
          // other fields
        },
        { transaction: t } // Associate the transaction with the Sequelize transaction
      );

      // Create Transaction_Product entries for each cart item
      for (const item of cartItems) {
        await TP.create(
          {
            transactionId: transaction.id,
            productId: item.Product.id,
            productPrice: item.Product.productPrice,
            quantity: item.quantity,
            // other fields
          },
          { transaction: t } // Associate the transaction with the Sequelize transaction
        );
      }
    });

    res.status(201).json({ message: "Cart items sent successfully" });
  } catch (error) {
    console.error("Error sending cart:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function getAllTransaction(req, res) {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = { isPaid: true };
    if (startDate && endDate) {
      whereClause = {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      };
    }

    const tr = await Transaction.findAll({
      include: [TP, Product],
      where: whereClause,
    });

    res.status(200).json({ data: tr });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
}

async function getAllUnpaidTransaction(req, res) {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = { isPaid: false };
    if (startDate && endDate) {
      whereClause = {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      };
    }

    const tr = await Transaction.findAll({
      include: [TP, Product],
      where: whereClause,
    });

    res.status(200).json({ data: tr });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
}

async function getTransactionId(req, res) {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: TP,
          include: [{ model: Product }],
        },
      ],
    });

    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }

    res.status(200).json({ data: transaction });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "An error occurred" });
  }
}
async function deleteCart(req, res) {
  try {
  } catch (error) {}
}

module.exports = {
  getAllUnpaidTransaction,
  getProductAdmin,
  deleteCartItems,
  createTransaction,
  getAllTransaction,
  getTransactionId,
  cartTotal,
  getCartItems,
  getCart,
  login,
  updateProduct,
  updateCart,
  getCategory,
  addCategory,
  getAdmin,
  getCashierAll,
  addCashier,
  getProduct,
  addProduct,
  updateCategory,
  deleteCategory,
  getCategoryId,
  getProductId,
};

async function getProductId(req, res) {
    try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.json({ error: 'Product not found' });
    }

    return res.json(product);
    }
    catch (err) {
        return res.status(500).json({message: err});
    };
};

async function getCategoryId(req,res){
    try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
        return res.json({ error: 'Category not found' });
    }

    return res.json(category);
    }
    catch (err) {
        return res.status(500).json({message: err});
    };
};

const deleteCategory = async (req, res) => {
    const category_id = req.params.id; 
    try {
      await Product.update({ category_id: null }, {
        where: { id: category_id }
      });
  
      await Category.destroy({ where: { category_id: category_id } });
    
      res.status(200).send(`Category ${category_id} was deleted successfully and all related products were set to category_id NULL.`);
    } catch (error) {
      res.status(500).send("Could not delete category. Error: "+ error);
    }
  };
 
  async function updateProduct(req,res){
    try {
        const {id} = req.params;
        const {productname, productprice, productdes, category}  = req.body;
        const product = await Product.findByPk(id)
        let updateData = {
            productName: productname,
            productPrice: productprice,
            productDescription: productdes,
            categoryId: category
        };
        if(req.file && req.file.path) {
            updateData.productImage = req.file.path;
        };
        if (updateData.productImage && product.productImage && fs.existsSync(product.productImage)) {
            fs.unlinkSync(product.productImage);
        };
        return db.sequelize.transaction(async (t) => {
            const updateprod = await Product.update(
                updateData,
                {
                    where: {id : id}
                },
                { transaction: t }
            );
            res.status(200).json({ message: 'Product updated successfully', product: updateData });
        });
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    };
};

const updateCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
  
    try {
      await db.sequelize.transaction(async (t) => {
       
          const existingItem = await Cart_Product.findOne({ where: { cartId, productId } }, { transaction: t });
  
          if (existingItem) {
            // Item already exists, update its quantity
            existingItem.quantity = quantity;
            await existingItem.save({ transaction: t });
            res.status(200).json({ message: 'Item updated successfully', item: existingItem });
          } else {
            // Item does not exist, create a new item in the cart
            const newItem = await Cart_Product.create(
              {
                cartId,
                productId,
                quantity,
                createdAt: new Date(), // Set the createdAt timestamp
                updatedAt: new Date(), // Set the updatedAt timestamp
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

  async function login(req, res){
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });
 
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const cart = await Cart.findOne({ where: { userId: user.id } });

  if (user.isAdmin) {
    res.json({ userId: user.id, isAdmin: true });
  } else {
    res.json({ userId: user.id, cartId: cart.id, isAdmin: false });
  }
}

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
  
      // Each cart will have a property "totalProductQuantity" representing the sum of product quantities in that cart.
      console.log(carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
}

async function createTransaction (req,res) {
    try {
    const {userId, totalPrice, totalItem} = req.body;
    return db.sequelize.transaction(async (t) => {
        const addproduct = await TP.create(
          {
             userId: userId,
             totalPrice: totalPrice,
             totalItem: totalItem
          },
          { transaction: t }
     );
     res.status(200).json({ message: 'Pending transaction recorded successfully', data: addProduct });
 });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occurred while creating transaction' })
    }
}

async function getAllTransaction (req,res) {
    try {
        const tr = await Transaction.findAll({
            include: [TP, Product]
        })
        res.status(200).json({data: tr})
    } catch (error) {
        res.status(500).json({message: 'error fetching transaction'})
    }
};

async function getTransactionId (req, res) {
    try {
        const {id} = req.params;
        const tr = await Transaction.findAll({
            include: [
                {
                    model: TP,
                    include: [{Product}]
                }
            ]
        })
    
        res.status(200).json({data: tr})
    } catch (error) {
        res.status(500).json({message: 'error fetching transaction details'})
    }
}

async function deleteCart(req, res) {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {deleteCartItems,createTransaction, getAllTransaction, getTransactionId,cartTotal,getCartItems,getCart,login,updateProduct,updateCart,getCategory, addCategory, getAdmin, getCashierAll, addCashier, getProduct, addProduct, updateCategory, deleteCategory, getCategoryId, getProductId}