const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: 1, name: 'Shoes', price: 49.99 },
  { id: 2, name: 'Bag', price: 29.99 },
  { id: 3, name: 'Hat', price: 19.99 },
];

let cart = [];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart', (req, res) => {
  const item = req.body;
  cart.push(item);
  res.json({ message: 'Added to cart', cart });
});

app.get('/checkout', (req, res) => {
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  res.json({ total: total.toFixed(2), items: cart });
});

app.listen(3000, () => console.log('App running on port 3000'));

module.exports = app;
