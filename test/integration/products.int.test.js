const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

it ("post /api/products", async () => {
    const response = await request(app)
        .post('/api/products')
        .send(newProduct);

    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
})

it("should return 500 on post /api/products", async () => {
    const response = await request(app)
    .post('/api/products')
    .send({name: 'jhoooo'})

    expect(response.statusCode).toBe(500);
    //console.log('response.body', response.body);
    expect(response.body).toStrictEqual({message: 'Product validation failed: description: Path `description` is required.'})
})

it("GET /api/products", async () => {
    const response = await request(app)
    .get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
})

