const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products && products.length > 0 ? products : getMockProducts());
    } catch (error) {
        console.error('Database error, serving mock data:', error.message);
        res.json(getMockProducts());
    }
};

const getMockProducts = () => [
    { _id: '1', name: 'Aquarium Stones', price: 299, category: 'Accessories', image: 'https://images.unsplash.com/photo-1520302630592-fac87dcd6ee4?auto=format&fit=crop&w=800&q=80', available: true, description: 'Decorative stones', stock: 30 },
    { _id: '2', name: 'Automatic Pet Feeder', price: 2500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80', available: true, description: 'Auto feeder', stock: 12 },
    { _id: '3', name: 'Betta Fish', price: 250, category: 'Fish', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80', available: true, description: 'Colorful fish', stock: 10 }
];

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, description, price, category, image, stock, available } = req.body;
    try {
        const product = new Product({
            name, description, price, category, image, stock, available
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { name, description, price, category, image, stock, available } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.image = image || product.image;
            product.stock = stock !== undefined ? stock : product.stock;
            product.available = available !== undefined ? available : product.available;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Admin Dashboard Stats
// @route   GET /api/products/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const Order = require('../models/Order'); // Local import to avoid circular dependency
        const totalOrders = await Order.countDocuments();
        const orders = await Order.find({});
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        res.json({
            totalProducts,
            totalOrders,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getAdminStats };
