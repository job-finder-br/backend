import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploads';
import { ExpressAdapter } from '@infra/http/adapters';

import {
  changeUserPasswordController,
  listUserController,
  registerUserController,
  showUserController,
  updateUserAvatarController,
  updateUserController,
} from '../factories/AccountsControllersFactory';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const accountsRouter = Router();
const uploadAvatar = multer(uploadConfig.upload('./uploads/avatar'));

accountsRouter.post('/', ExpressAdapter.create(registerUserController.handle));

accountsRouter.use(EnsureAuthenticated.handle);

accountsRouter.get('/', ExpressAdapter.create(listUserController.handle));

accountsRouter.get('/:id', ExpressAdapter.create(showUserController.handle));

accountsRouter.put('/', ExpressAdapter.create(updateUserController.handle));

accountsRouter.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  ExpressAdapter.create(updateUserAvatarController.handle),
);

accountsRouter.patch(
  '/password',
  ExpressAdapter.create(changeUserPasswordController.handle),
);

export { accountsRouter };
