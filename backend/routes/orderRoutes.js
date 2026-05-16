const express = require('express');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/user').get(protect, getMyOrders);
router.route('/all').get(protect, admin, getOrders);
router.route('/:id').put(protect, admin, updateOrderStatus);

module.exports = router;
