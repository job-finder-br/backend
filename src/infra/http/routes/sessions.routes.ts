import { Router } from 'express';

import { ExpressAdapter } from '@infra/http/adapters';

import { authenticateUserController } from '../factories/SessionsControllersFactory';

const authenticateRouter = Router();

authenticateRouter.post(
  '/',
  ExpressAdapter.create(authenticateUserController.handle),
);

export { authenticateRouter };
