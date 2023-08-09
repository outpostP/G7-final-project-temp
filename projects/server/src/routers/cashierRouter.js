const express = require("express");
const router = express.Router();
const {
  getProduct,
  getCart,
  updateCart,
  getCartItems,
  cartTotal,
  deleteCartItems,
  createTransaction,
} = require("../controllers/admin/ctrlAdmin");
const { verifyToken, verifyCashier } = require("../middleware/auth");

router.get("/product", verifyToken, verifyCashier, getProduct); //cashier
router.put("/cart/item", verifyToken, verifyCashier, updateCart); //cashier
router.get("/cart/item", verifyToken, verifyCashier, getCartItems); //cashier
router.delete("/cart/item", verifyToken, verifyCashier, deleteCartItems); //cashier
router.post("/transaction", verifyToken, verifyCashier, createTransaction); //cashier
router.get("/cart/total", verifyToken, verifyCashier, cartTotal); //cashier
router.get("/cart/:cartId", verifyToken, verifyCashier, getCart); //cashier

module.exports = router;
