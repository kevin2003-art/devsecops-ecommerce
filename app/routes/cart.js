const express = require('express');
const router = express.Router();
const { products } = require('./products');

router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.render('cart', { title: 'Your Cart', cart, total, user: req.session.user || null });
});

router.post('/add', (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (!req.session.cart) req.session.cart = [];
  const existing = req.session.cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += parseInt(qty) || 1;
  } else {
    req.session.cart.push({ ...product, qty: parseInt(qty) || 1 });
  }
  res.redirect('/cart');
});

router.post('/remove', (req, res) => {
  const { productId } = req.body;
  req.session.cart = (req.session.cart || []).filter(i => i.id !== parseInt(productId));
  res.redirect('/cart');
});

router.post('/checkout', (req, res) => {
  req.session.cart = [];
  res.render('checkout', { title: 'Order Confirmed', user: req.session.user || null });
});

module.exports = router;
