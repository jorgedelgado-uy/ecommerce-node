import ProductContainer from '../container/product.container.js';
const productContainer = new ProductContainer('Products.txt');

export default class ProductService{

    async getProductById(id){
        return await productContainer.getById(id);
    }

    async addProduct(product){

        let {title, description, code, price, thumbnail, stock} = product;

        if (!thumbnail || !price || !title || !description || !code || !stock)
            return {Error: `Parameters can't be null`};
        else
            return await productContainer.save(product);
    }

    async modifyProduct(id, product){
        return await productContainer.modify(id, product);
    }

    async deleteProduct(id){
        return await productContainer.deleteById(id);
    }

    async getAllProducts(){
        return await productContainer.getAll();
    }
}

