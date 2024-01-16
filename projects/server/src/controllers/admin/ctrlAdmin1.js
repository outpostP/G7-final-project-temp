const db = require('../../../models')
const Product = db.Products;
const Category = db.Category;
const { Op } = require("sequelize");

async function getCategory(req, res)  {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const totalCategory = await Category.count();
      
        const totalPages = Math.ceil(totalCategory / limit);

        const size = (function() {
            if (totalPages > limit) {
                return limit;
            } else {
                return totalPages;
            }
        })();

        const category = await Category.findAll({
            limit: limit,
            offset: offset
        })
        res.status(200).json({data: {
            totalPages: totalPages,
            page: page,
            pageSize: size,
            category: category,
        }});
    } catch (error) {
        res.status(500).json({message: 'error fetching categories'})
    }
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

async function getProductAdmin(req, res){
    try {
        console.log(req.query)
        const { page, limit, offset } = getPaginationParams(req);
        const where = buildProductFilterAdmin(req);
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
        const products = await getProductsAndIncludeAdmin(where, order, offset, limit);
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

const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

const buildProductFilterAdmin = (req) => {
    const { id_category, productName } = req.query;
    const where = { };
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

const getProductsAndIncludeAdmin = async (where, order, offset, limit) => {
    const includeOptions = [
        { model: Category },
    ];
    return await Product.findAll({
        where,
        order,
        offset,
        limit,
        include: includeOptions,
    });
};

async function addProduct(req,res){
    console.log('add prod', req)
    try {
        const {productname, productprice, productdes, category}  = req.body;
        return db.sequelize.transaction(async (t) => {
            const addproduct = await Product.create(
              {
                 productName: productname,
                 productPrice: productprice,
                 productDescription: productdes,
                 productImage: req.file.path,
                // productImage: 'aaaa',
                 categoryId: category
              },
              { transaction: t }
         );
         res.status(200).json({ message: 'Product added successfully', category: addproduct });
     });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({message: err.message});
    };
};

module.exports = {getProductAdmin,getCategory, addCategory,  addProduct, updateCategory}