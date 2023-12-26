const productController = require('../../controller/products');
const productModel = require('../../model/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProduct = require('../data/all-product.json');

productModel.create = jest.fn()
productModel.find = jest.fn()
productModel.findById = jest.fn()

const productId = "adfasdfasdfasdf"

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe('Product Controller Create', () => {

    beforeEach(()=> {
        req.body = newProduct;
    })

    it('should have a createProduct Function', () => {
        expect(typeof productController.createProduct).toBe("function");
    })

    it("should call ProductModel.create", async () => {
        req.body = newProduct;
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })

    it("should return 201 response code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should return json body in response", async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);

    })

    it("should handle errors", async() => {
        const errorMessage = {message: "description property missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req,res,next);
        expect(next).toBeCalledWith(errorMessage);

    })
});

describe("Procuct Controller Get", () => {
    it("should have a getProducts", () => {
        expect(typeof productController.getProducts).toBe("function")
    });

    it("should call ProductModel.find({})", async () => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({})
    })

    it("should return 200 response", async() => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should return json body in response", async() => {
        productModel.find.mockReturnValue(allProduct)
        await productController.getProducts(req,res,next);
        expect(res._getJSONData()).toStrictEqual(allProduct);
    })

    it("should handle errors", async() => {
        const errorMessage = { message : "Error finding product data"}
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})


describe("Product Controller GetById", () => {
    it("should have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function")
    })

    it("should call productMode.findById", async() => {
        req.params.productId = productId;
        await productController.getProductById(req, res ,next);
        expect(productModel.findById).toBeCalledWith(productId);
    })

    it("should return json body and reponse code 200", async() => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy(); 
    })

    it("should return 404 when item doesnt exist", async() =>{
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})