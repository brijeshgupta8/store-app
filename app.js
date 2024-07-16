const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/store', { useNewUrlParser: true, useUnifiedTopology: true });

// Models
const Product = require('./models/product');

// Routes
const indexRoutes = require('./routes/index');
app.use('/api', indexRoutes);

// Serve HTML files
app.get('/products', (req, res) => res.sendFile(__dirname + '/public/products.html'));
app.get('/cart', (req, res) => res.sendFile(__dirname + '/public/cart.html'));
app.get('/checkout', (req, res) => res.sendFile(__dirname + '/public/checkout.html'));
app.get('/purchased', (req, res) => res.sendFile(__dirname + '/public/purchased.html'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
