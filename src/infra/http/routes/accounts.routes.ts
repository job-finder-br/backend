import { Router } from 'express';

import { ExpressAdapter } from '@infra/http/adapters';

import {
  changeUserPasswordController,
  listUserController,
  registerUserController,
  showUserController,
  updateUserController,
} from '../factories/AccountsControllersFactory';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const accountsRouter = Router();

accountsRouter.post('/', ExpressAdapter.create(registerUserController.handle));

accountsRouter.use(EnsureAuthenticated.handle);

accountsRouter.get('/', ExpressAdapter.create(listUserController.handle));

accountsRouter.get('/:id', ExpressAdapter.create(showUserController.handle));

accountsRouter.put('/:id', ExpressAdapter.create(updateUserController.handle));

accountsRouter.patch(
  '/:id',
  ExpressAdapter.create(changeUserPasswordController.handle),
);

export { accountsRouter };
