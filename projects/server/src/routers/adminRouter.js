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
const {
  verifyToken,
  verifyAdmin,
  verifyCashier,
} = require("../middleware/auth");

router.post("/login", login);
router.get("/cate", verifyToken, getCategory); //common
router.post("/cate", verifyToken, verifyAdmin, addCategory);
router.patch("/cate", verifyToken, verifyAdmin, updateCategory);
router.get("/cashier", verifyToken, verifyAdmin, getCashierAll);
router.post("/cashier", verifyToken, verifyAdmin, addCashier);
router.get("/productA", verifyToken, verifyAdmin, getProductAdmin);
router.post(
  "/product",
  verifyToken,
  verifyAdmin,
  multerUpload.single("productImage"),
  addProduct
);
router.get("/transaction", verifyToken, verifyAdmin, getAllTransaction);
router.get("/unpaid", verifyToken, verifyAdmin, getAllUnpaidTransaction);
router.patch(
  "/product/:id",
  verifyToken,
  verifyAdmin,
  multerUpload.single("productImage"),
  updateProduct
);
router.get("/transaction/:id", verifyToken, verifyAdmin, getTransactionId);
router.get("/product/:id", verifyToken, verifyAdmin, getProductId);

module.exports = router;
