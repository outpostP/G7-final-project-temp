const express = require("express");
const router = express.Router();
const getCategoryFree = require('../controllers/generalController')

router.get('/cateall', getCategoryFree);

module.exports = router