const productController = require('../../controller/products');
const productModel = require('../../model/Product');

productModel.create = jest.fn()

describe('Product Controller Create', () => {
    it('should have a createProduct Function', () => {
        expect(typeof productController.createProduct).toBe("function");
    });

    it("should call ProductModel.create", () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
    })
});