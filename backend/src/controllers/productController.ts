import { Request, Response, RequestHandler } from 'express';
import { inventoryService } from '../services/inventoryService';
import { sendSuccess } from '../utils/httpResponses';

const list: RequestHandler = async (req: Request, res: Response) => {
    const products = await inventoryService.listProducts({
      category: req.query.category as string,
      seasonal: req.query.seasonal ? req.query.seasonal === 'true' : undefined
    });
    sendSuccess(res, { products });
  };

const create: RequestHandler = async (req: Request, res: Response) => {
    const product = await inventoryService.createProduct(req.body);
    sendSuccess(res, { product }, 'Product created');
  };

const update: RequestHandler = async (req: Request, res: Response) => {
    const product = await inventoryService.updateProduct(req.params.id, req.body);
    sendSuccess(res, { product }, 'Product updated');
  };

export const productController = { list, create, update };

