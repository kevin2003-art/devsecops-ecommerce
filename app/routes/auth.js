const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = [];

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', error: null, user: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { title: 'Login', error: 'Invalid email or password.', user: null });
  }
  req.session.user = { name: user.name, email: user.email };
  res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', error: null, user: null });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.render('register', { title: 'Register', error: 'Email already registered.', user: null });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashed });
  req.session.user = { name, email };
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
