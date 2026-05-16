const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getAdminStats } = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/admin/stats').get(protect, admin, getAdminStats);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
