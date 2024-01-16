const express = require("express");
const router = express.Router();
const {getCategory, addCategory,   addProduct, updateCategory, getProductAdmin,} = require('../controllers/admin/ctrlAdmin1');
const {getCategoryId,getProductId,deleteCategory,getTransactionId, getAllTransaction,getAllUnpaidTransaction, updateProduct}= require('../controllers/admin/ctrlAdmin2')
const {multerUpload} = require('../middleware/multer')
const {verifyToken, verifyAdmin} = require('../middleware/auth')


router.get('/cate',verifyToken, verifyAdmin, getCategory);
router.post('/cate',verifyToken, verifyAdmin, addCategory);
router.patch('/cate',verifyToken, verifyAdmin, updateCategory);
router.get('/product',verifyToken, verifyAdmin, getProductAdmin);
router.post('/product',verifyToken, verifyAdmin, multerUpload.single('productImage') ,addProduct);
router.get('/transaction',verifyToken, verifyAdmin, getAllTransaction)
router.get('/unpaid',verifyToken, verifyAdmin, getAllUnpaidTransaction)
router.patch('/product/:id',verifyToken, verifyAdmin, multerUpload.single('productImage') ,updateProduct);
router.get('/transaction/:id',verifyToken, verifyAdmin, getTransactionId);
router.get('/product/:id',verifyToken, verifyAdmin, getProductId);
router.get('/cate/:id',verifyToken, verifyAdmin, getCategoryId);
router.patch('/cate/:id',verifyToken, verifyAdmin, updateCategory);
router.delete('/cate/:id',verifyToken, verifyAdmin, deleteCategory);


module.exports = router;
