const db = require('../../../models')
const fs = require('fs');
const Transaction = db.Transaction;
const Product = db.Products;
const Category = db.Category;
const Users = db.User;
const Profile = db.User_Profile;
const Cart = db.Cart;
const Cartlist = db.Cart_Product;


async function getCategory(req, res)  {
        const category = await Category.findAll();
        return res.status(200).json({data: category});
    };

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
    return res.status(200).json({data: user});
    }
    catch (err) {
        console.error('error', err)
        return res.status(500).json({message: err.message})
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

async function getProduct(req, res){
    try {
        const product = await Product.findAll({
            include : [
                {
                    model: Category,
                }
            ]
        });
        return res.status(200).json({message:' fetching succeed', data: product});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    };
};

async function addProduct(req,res){
    try {
        const {productname, productprice, productdes, category}  = req.body;
        return db.sequelize.transaction(async (t) => {
            const addproduct = await Product.create(
              {
                 productName: productname,
                 productPrice: productprice,
                 productDescription: productdes,
                 productImage: req.file.path,
                 categoryId: category
              },
              { transaction: t }
         );
         res.status(200).json({ message: 'Product added successfully', category: addproduct });
     });
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    };
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
        if (product.productImage && fs.existsSync(product.productImage)) {
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
            const item = await Cart_Product.findOne({ where: { cartId, productId } }, { transaction: t });

            if (!item) {
                return res.status(404).json({ message: 'Item not found in cart' });
            }

            if (quantity > 0) {
                item.quantity = quantity;
                await item.save({ transaction: t });
                res.status(200).json({ message: 'Item updated successfully', item });
            } else {
                await item.destroy({ transaction: t });
                res.status(200).json({ message: 'Item removed successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating or removing item' });
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
  console.log(user.isAdmin)
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


module.exports = {getCart,login,updateProduct,updateCart,getCategory, addCategory, getAdmin, getCashierAll, addCashier, getProduct, addProduct, updateCategory, deleteCategory, getCategoryId, getProductId}