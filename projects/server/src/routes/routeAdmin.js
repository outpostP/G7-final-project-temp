const express = require('express');
const router = express.Router();
const {getCategory, getCashier, addCategory, addCashier, getProduct, addProduct} = require('../controller/admin/ctrlAdmin');
const {multerUpload} = require('../middleware/multer')


router.get('/cate', getCategory);
router.post('/cate', addCategory);
router.get('/cashier', getCashier);
router.post('/cashier', addCashier);
router.get('/product', getProduct);
router.post('/product', multerUpload.single('productImage') ,addProduct);


module.exports = router;