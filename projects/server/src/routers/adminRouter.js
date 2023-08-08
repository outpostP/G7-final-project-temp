const express = require("express");
const router = express.Router();
const {getCategory,login, getCashierAll, addCategory, addCashier,updateProduct, getProduct, addProduct, updateCategory, getCart, updateCart, getCartItems, cartTotal, deleteCartItems, createTransaction, getTransactionId, getAllTransaction, getProductId, getProductAdmin, getAllUnpaidTransaction, getCategoryFree, getCategoryId, deleteCategory} = require('../controllers/admin/ctrlAdmin');
const {multerUpload} = require('../middleware/multer')


router.get('/cate', getCategory);
router.get('/cateall', getCategoryFree);
router.post('/cate', addCategory);
router.patch('/cate', updateCategory);
router.get('/cashier', getCashier);
router.post('/cashier', addCashier);
router.get('/product', getProduct);
router.get('/productA', getProductAdmin);
router.post('/product', multerUpload.single('productImage') ,addProduct);
router.delete('/cart/item', deleteCartItems);
router.post('/transaction', createTransaction)
router.get('/transaction', getAllTransaction)
router.get('/unpaid', getAllUnpaidTransaction)
router.get('/cart/total', cartTotal);
router.patch('/product/:id', multerUpload.single('productImage') ,updateProduct);
router.get('/cart/:cartId', getCart);
router.get('/transaction/:id', getTransactionId);
router.get('/product/:id', getProductId);
router.get('/cate/:id', getCategoryId);
router.patch('/cate/:id', updateCategory);
router.delete('/cate/:id', deleteCategory);


module.exports = router;
