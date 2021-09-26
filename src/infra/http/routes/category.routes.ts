import { Router } from 'express';

import { ExpressAdapter } from '@infra/http/adapters';

import { listCategoryController } from '../factories/CategoryControllersFactory';

const categoryRouter = Router();

categoryRouter.get('/', ExpressAdapter.create(listCategoryController.handle));

export { categoryRouter };
