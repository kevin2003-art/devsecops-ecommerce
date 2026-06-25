const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return 200 and render homepage', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('ShopSecure');
  });
});

describe('GET /product/:id', () => {
  it('should return 200 for valid product', async () => {
    const res = await request(app).get('/product/1');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Wireless Headphones');
  });

  it('should return 404 for invalid product', async () => {
    const res = await request(app).get('/product/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /cart', () => {
  it('should return 200 and show cart page', async () => {
    const res = await request(app).get('/cart');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Cart');
  });
});

describe('GET /auth/login', () => {
  it('should return 200 and show login form', async () => {
    const res = await request(app).get('/auth/login');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Login');
  });
});

describe('GET /auth/register', () => {
  it('should return 200 and show register form', async () => {
    const res = await request(app).get('/auth/register');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Register');
  });
});

describe('GET /nonexistent', () => {
  it('should return 404', async () => {
    const res = await request(app).get('/nonexistent-page');
    expect(res.statusCode).toBe(404);
  });
});
