import CartContainer from '../container/cart.container.js';
import ProductService from './product.service.js';

const cartContainer = new CartContainer('Cart.txt');
const productService = new ProductService();

export default class CartService{

    async addcart(cart){
        return await cartContainer.save(cart);
    }

    async deleteCart(id){
        return await cartContainer.deleteById(id);
    }

    async getCartProductsById(id){
        let cart = await cartContainer.getById(id);
        return cart.products;
    }

    async addProductToCart(productId, id){
        let product = await productService.getProductById(productId);
        return await cartContainer.addProduct(id, product);
    }

    async deleteProductfromCart(id, productId){
        return await cartContainer.removeProduct(id, productId);
    }
}

