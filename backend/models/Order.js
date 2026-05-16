const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'UPI'], required: true },
    status: { type: String, enum: ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'], default: 'Placed' },
    address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
