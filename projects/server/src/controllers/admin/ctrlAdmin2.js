const db = require('../../../models')
const fs = require('fs');
const Transaction = db.Transaction;
const TP = db.Transaction_Product;
const Product = db.Products;
const Category = db.Category;
const Users = db.User;
const Profile = db.User_Profile;
const Cart = db.Cart;
const Cart_Product = db.Cart_Product;
const { Op } = require("sequelize");

async function updateProduct(req,res){
    try {
        const {id} = req.params;
        const {productname, productprice, productdes, category, status}  = req.body;
        const product = await Product.findByPk(id)
        let updateData = {
            productName: productname,
            productPrice: productprice,
            productDescription: productdes,
            categoryId: category,
            isActive: status
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

  async function getAllTransaction(req, res) {
    try {
      const { startDate, endDate } = req.query;
  
      let whereClause = { isPaid: true }
      if (startDate && endDate) {
        
          whereClause = {
            isPaid: true,
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate).setHours(23,59,59)]
            }
          }
        }
      
  
      const tr = await Transaction.findAll({
        include: [TP, Product],
        where: whereClause
      });
  
      res.status(200).json({ data: tr });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  }
 
  async function getAllUnpaidTransaction(req, res) {
    try {
      const { startDate, endDate } = req.query;
  
      let whereClause = {  };
      if (startDate && endDate) {
        
          whereClause = {
            isPaid: false,
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate).setHours(23,59,59)]
            }
          }
      }
  
      const tr = await Transaction.findAll({
        include: [TP, Product],
        where: whereClause
      });
  
      res.status(200).json({ data: tr });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  }
  

async function getTransactionId(req, res) {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id, {
            include: [
                {
                    model: TP,
                    include: [{ model: Product }]
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

const deleteCategory = async (req, res) => {
    const {id} = req.params; 
    console.log(id)
    try {
      await Product.update({ category_id: 'none' }, {
        where: { category_id: id }
      });
      const category = await Category.findOne({ where: { id: id } });
      await Category.update({isActive: !category.isActive} ,{ where: { id: id } });
    
      res.status(200).send(`Category ${id} was deleted successfully and all related products were set to category_id NULL.`);
    } catch (error) {
      res.status(500).send("Could not delete category. Error: "+ error);
    }
  };
  async function getProductId(req, res) {
    try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
        include: Category
    });

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


module.exports = {getCategoryId,getProductId,deleteCategory,getTransactionId, getAllTransaction,getAllUnpaidTransaction, updateProduct}