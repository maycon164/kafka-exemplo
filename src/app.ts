import express from 'express';
import { productRoute } from './routes/product.route';

const app = express();
app.use(express.json());
app.use('/product', productRoute);

app.listen('8080', () => {
    console.log('app is running on 8080');
})