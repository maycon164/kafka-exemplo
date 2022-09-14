import { Request, Response } from 'express';
import kafkaService from '../service/kafka';

async function createNewProduct(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    try {
        console.log('AQUI')
        const product = new Product(body);
        await kafkaService.sendProduct(product);
        return res.json({ message: 'product sended' })

    } catch (err) {
        return res.json({ message: 'deu ruim!!!' })
    }
}

async function teste(req: Request, res: Response) {
    return res.json({ message: 'so aqui' })
}

export class Product {
    //private categories = ['Fashion', 'Eletronic', 'Domestic', 'Food', 'Game'];

    name: string
    price: number
    category: string

    constructor(body: any) {
        this.name = body.name;
        this.price = Number(body.price);
        this.category = body.category
        //this.categories.indexOf(body.category) >= 0 ? body.category : null;
    }
}

export {
    createNewProduct,
    teste
}