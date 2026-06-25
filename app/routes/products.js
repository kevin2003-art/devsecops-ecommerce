const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Wireless Headphones', price: 2999, category: 'Electronics', description: 'High quality wireless headphones with noise cancellation.' },
  { id: 2, name: 'Running Shoes', price: 1499, category: 'Footwear', description: 'Lightweight running shoes for daily training.' },
  { id: 3, name: 'Coffee Mug', price: 399, category: 'Kitchen', description: 'Ceramic coffee mug, 350ml capacity.' },
  { id: 4, name: 'Backpack', price: 1999, category: 'Accessories', description: '30L waterproof backpack for travel and hiking.' },
  { id: 5, name: 'Notebook', price: 199, category: 'Stationery', description: 'A5 ruled notebook, 200 pages.' },
  { id: 6, name: 'Phone Stand', price: 599, category: 'Electronics', description: 'Adjustable aluminium phone and tablet stand.' }
];

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let filtered = products;
  if (category) filtered = filtered.filter(p => p.category === category);
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const categories = [...new Set(products.map(p => p.category))];
  res.render('index', {
    title: 'ShopSecure',
    products: filtered,
    categories,
    selectedCategory: category || '',
    search: search || '',
    cart: req.session.cart || [],
    user: req.session.user || null
  });
});

router.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).render('404', { title: 'Not Found' });
  res.render('product', {
    title: product.name,
    product,
    cart: req.session.cart || [],
    user: req.session.user || null
  });
});

module.exports = router;
module.exports.products = products;
