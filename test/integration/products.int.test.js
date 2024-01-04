const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

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
    firstProduct = response.body[0]
})

it("GET /api/product/:productId", async() => {
    const response = await request(app).get('/api/products/' + firstProduct._id);
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(firstProduct.name)
    expect(response.body.description).toBe(firstProduct.description)
})

it("Get id doesnt exist /api/products/:productId", async() => {
    const response = await request(app).get('/api/products/123')
    expect(response.statusCode).toBe(500);
})

it("put /api/products", async() => {
    const response = await request(app).put("/api/products/"+firstProduct._id)
    .send({ name: "updated name", description:"updated description"})

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe("updated name")
    expect(response.body.description).toBe("updated description")
})

it("should return 404 on put /api/products", async() => {
    const response = await request(app)
                            .put("/api/products" + "658a7ea3c676d37b2d9d21ab")
                            .send({name: "updated name", description: "update description"})
    expect(response.statusCode).toBe(404);
})


it("DELETE /api/products", async() => {
    const response = await request(app)
                            .delete("/api/products/" + firstProduct._id)
                            .send();
    expect(response.statusCode).toBe(200);
})

it("delete id donset exist /api/products/:productId", async() => {
    const response = await request(app)
                            .delete("/api/products/" + firstProduct._id)
                            .send();
    expect(response.statusCode).toBe(404)
})