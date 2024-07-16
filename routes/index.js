const express = require('express');
const router = express.Router();
const Product = require('../models/product');

let purchasedProducts = []; // Define purchasedProducts at the top

// Seed products (run this once)
const seedProducts = async () => {
    await Product.deleteMany({});
    await Product.insertMany([
        { name: 'Product 1', price: 100, image: 'product1.jpg' },
        { name: 'Product 2', price: 200, image: 'product2.jpg' },
        { name: 'Product 3', price: 300, image: 'product3.jpg' },
        { name: 'Product 4', price: 400, image: 'product4.jpg' },
        { name: 'Product 5', price: 500, image: 'product5.jpg' },
        { name: 'Product 6', price: 600, image: 'product6.jpg' }
    ]);
};
seedProducts();

// Get all products
router.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

// Checkout
router.post('/checkout', async (req, res) => {
    const { name, address, cart } = req.body;
    const productIds = JSON.parse(cart || '[]'); // Expecting cart to be passed in the request

    // Find purchased products
    const productsToPurchase = await Product.find({ _id: { $in: productIds } });

    // Store purchased products in the temporary array
    purchasedProducts = purchasedProducts.concat(productsToPurchase);

    console.log('Order placed by:', name);
    console.log('Address:', address);
    console.log('Purchased Products:', productsToPurchase);

    res.json({ success: true });
});

// Get purchased products
router.get('/purchased', (req, res) => {
    res.json(purchasedProducts);
});

module.exports = router;






