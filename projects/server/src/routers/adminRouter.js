const express = require("express");
const router = express.Router();
const {getCategory,login, getCashierAll, addCategory, addCashier,updateProduct, getProduct, addProduct, updateCategory, getCart, updateCart} = require('../controllers/admin/ctrlAdmin');
const {multerUpload} = require('../middleware/multer')


router.get('/cate', getCategory);
router.post('/cate', addCategory);
router.patch('/cate', updateCategory);
router.get('/cashier', getCashier);
router.post('/cashier', addCashier);
router.get('/product', getProduct);
router.post('/product', multerUpload.single('productImage') ,addProduct);
router.get('/cart/:cartId', getCart);
router.put('/cart/item', updateCart);


module.exports = router;
