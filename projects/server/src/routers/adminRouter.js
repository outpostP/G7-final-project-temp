const express = require('express');
const router = express.Router();
const {getCategory,login, getCashierAll, addCategory, addCashier,updateProduct, getProduct, addProduct, updateCategory, getCart, updateCart, getCartItems, cartTotal, deleteCartItems, createTransaction, getTransactionId, getAllTransaction, getProductId, getProductAdmin, getAllUnpaidTransaction} = require('../controllers/admin/ctrlAdmin');
const {multerUpload} = require('../middleware/multer')


router.post('/login', login);
router.get('/cate', getCategory);
router.post('/cate', addCategory);
router.patch('/cate', updateCategory);
router.get('/cashier', getCashierAll);
router.post('/cashier', addCashier);
router.get('/product', getProduct);
router.get('/productA', getProductAdmin);
router.post('/product', multerUpload.single('productImage') ,addProduct);
router.put('/cart/item', updateCart);
router.get('/cart/item', getCartItems);
router.delete('/cart/item', deleteCartItems);
router.post('/transaction', createTransaction)
router.get('/transaction', getAllTransaction)
router.get('/unpaid', getAllUnpaidTransaction)
router.get('/cart/total', cartTotal);
router.patch('/product/:id', multerUpload.single('productImage') ,updateProduct);
router.get('/cart/:cartId', getCart);
router.get('/transaction/:id', getTransactionId);
router.get('/product/:id', getProductId);


module.exports = router;