import express from "express";
import CartServices from '../service/cart.service.js'

const route = express.Router();
const CartService = new CartServices();

route.post('/', async (req, res) =>{
    res.json(await CartService.addcart(req.body));
})

route.delete('/:id', async (req, res) =>{
    res.json(await CartService.deleteCart(req.params.id))
})

route.get('/:id/products', async (req, res) =>{
    res.json(await CartService.getCartProductsById(req.params.id));
})

route.post('/:id/products/:id_product', async (req, res) =>{
    res.json(await CartService.addProductToCart(req.params.id_product, req.params.id));
})

route.delete('/:id/products/:id_product', async (req, res) =>{
    res.json(await CartService.deleteProductfromCart(req.params.id, req.params.id_product));
})


export { route as cartRoutes }