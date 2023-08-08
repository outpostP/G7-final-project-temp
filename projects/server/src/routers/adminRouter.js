const express = require("express");
const router = express.Router();
const {
  getCategory,
  login,
  getCashierAll,
  addCategory,
  addCashier,
  updateProduct,
  getProduct,
  addProduct,
  updateCategory,
  getCart,
  updateCart,
  getCartItems,
  cartTotal,
  deleteCartItems,
  createTransaction,
  getTransactionId,
  getAllTransaction,
  getProductId,
  getProductAdmin,
  getAllUnpaidTransaction,
} = require("../controllers/admin/ctrlAdmin");
const { multerUpload } = require("../middleware/multer");

router.post("/login", login);
router.get("/cate", getCategory); //common
router.post("/cate", addCategory);
router.patch("/cate", updateCategory);
router.get("/cashier", getCashierAll);
router.post("/cashier", addCashier);
router.get("/product", getProduct); //cashier
router.get("/productA", getProductAdmin);
router.post("/product", multerUpload.single("productImage"), addProduct);
router.put("/cart/item", updateCart); //cashier
router.get("/cart/item", getCartItems); //cashier
router.delete("/cart/item", deleteCartItems); //cashier
router.post("/transaction", createTransaction); //cashier
router.get("/transaction", getAllTransaction);
router.get("/unpaid", getAllUnpaidTransaction);
router.get("/cart/total", cartTotal); //cashier
router.patch(
  "/product/:id",
  multerUpload.single("productImage"),
  updateProduct
);
router.get("/cart/:cartId", getCart); //cashier
router.get("/transaction/:id", getTransactionId);
router.get("/product/:id", getProductId);

module.exports = router;
