import express from "express";
import ProductServices from "../service/product.service.js";

const route = express.Router();
const ProductService = new ProductServices();
const isAdmin = true;

route.get('/:id', async (req, res) =>{
    res.json(await ProductService.getProductById(req.params.id));
})

route.post('/', async (req, res) =>{
    if (isAdmin == false){
        res.json({error: -1, description: `Route ${req.originalUrl} method ${req.method} not authorized`})
    }
    res.json(await ProductService.addProduct(req.body));
})

route.put('/:id', async (req, res) =>{
    if (isAdmin == false){
        res.json({error: -1, description: `Route ${req.originalUrl} method ${req.method} not authorized`})
    }
    res.json(await ProductService.modifyProduct(req.params.id, req.body));
})

route.delete('/:id', async (req, res) =>{
    if (isAdmin == false){
        res.json({error: -1, description: `Route ${req.originalUrl} method ${req.method} not authorized`})
    }
    res.json(await ProductService.deleteProduct(req.params.id))
})

export { route as productRoutes }

