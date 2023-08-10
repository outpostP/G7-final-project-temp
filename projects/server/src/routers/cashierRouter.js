const express = require("express");
const router = express.Router();
const {getProduct,payment,resetCart, transactionCashier, updateCart} = require('../controllers/cashier/cashierController1');
const {deleteCartItems,createTransaction,cartTotal,getCartItems,getCart} = require('../controllers/cashier/cashierController2');
const {verifyCashier,verifyToken,verifyCashierStatus} = require('../middleware/auth')

router.put('/cart/item',verifyToken, verifyCashier, verifyCashierStatus, updateCart);
router.get('/cart/item',verifyToken, verifyCashier, verifyCashierStatus, getCartItems);
router.delete('/cart/item',verifyToken, verifyCashier, verifyCashierStatus, deleteCartItems);
router.post('/transaction',verifyToken, verifyCashier, verifyCashierStatus, createTransaction)
router.get('/cart/total',verifyToken, verifyCashier, verifyCashierStatus, cartTotal);
router.get('/cart/:cartId',verifyToken, verifyCashier, verifyCashierStatus, getCart);
router.delete('/cart/:id',verifyToken, verifyCashier, verifyCashierStatus, resetCart);
router.post('/checkout/:id',verifyToken, verifyCashier, verifyCashierStatus, payment)
router.get('/checkout/:id',verifyToken, verifyCashier, verifyCashierStatus, transactionCashier);
router.get('/product',verifyToken, verifyCashier, verifyCashierStatus, getProduct);

module.exports = router;
