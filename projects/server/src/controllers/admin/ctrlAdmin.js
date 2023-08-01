const db = require('../../../models')
const Transaction = db.Transaction;
const Product = db.Products;
const Category = db.Category;
const Users = db.User;
const Profile = db.User_Profile;

async function getCategory(req, res)  {
        const category = await Category.findAll();
        return res.status(200).json({data: category});
    };

async function addCategory (req, res) {
    const {category} = req.body
    try {
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
    const {category} = req.body;
    try {
        return db.sequelize.transaction(async (t) => {
            const updatedCategory = await Category.update(
                {
                    categoryName: category
                },
                {
                    where: { categoryName: category },
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

async function getCashier(req,res) {
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
        console.error('error', err)
        return res.status(500).json({message: err.message})
    };
};

async function addCashier(req,res){
    try {
    const {username, email, password} = req.body;
    return db.sequelize.transaction(async (t) => {
        const addingCashier = await Users.create(
           { 
            username,
            email,
            password
           },
           {transaction: t}
           )
           const addProfile = await Profile.create(
                {
                    userId: addingCashier.id
                },
                {transaction: t}
           ); 
           res.status(200).json({message: 'cashier added', data: addingCashier });
    });
    }
    catch (err) {
        console.error('error', err)
        return res.status(500).json({message: err.message})
    };
};

async function getProduct(req, res){
    try {
        const product = await Product.findAll({
            include : [
                {
                    model: Category,
                }
            ]
        });
        return res.status(200).json({message:' fetching succeed', data: product})
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

module.exports = {getCategory, addCategory, getAdmin, getCashier, addCashier, getProduct, addProduct, updateCategory}