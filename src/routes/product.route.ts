import { Router } from 'express'
import { createNewProduct, teste } from '../controller/product.controller'
const router = Router();

router.post('/', createNewProduct);
router.get('/', teste);

export { router as productRoute };