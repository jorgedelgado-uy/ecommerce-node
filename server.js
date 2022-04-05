import express from 'express';
import path from 'path';
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { productRoutes } from './routes/product.route.js';
import { cartRoutes } from './routes/cart.routes.js';
import ProductService from './service/product.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = new createServer(app);
const socket = new Server(server);
const productService = new ProductService();

socket.on('connection', async ()=>{
    console.log('Connection Stablished');
    socket.sockets.emit('showProducts', await productService.getAllProducts());
})

app.set('port', process.env.port || 8080);
app.set('views', path.join(__dirname, 'views/hbs'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), ()=>{
    console.log(`Server listening on port ${app.get('port')}`);
})

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/*', (req, res) => {
    res.json({error: -2 , description: `Route ${req.originalUrl} method ${req.method} not authorized`});
});

app.get('/', (req, res) =>{
    res.send('index');
})




