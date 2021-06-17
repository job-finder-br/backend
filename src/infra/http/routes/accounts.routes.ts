import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploads';
import { ExpressAdapter } from '@infra/http/adapters';

import { CelebrateAdapter } from '../adapters/CelebrateAdapter';
import {
  changeUserPasswordController,
  changeUserRecolocationController,
  deleteAccountController,
  listUserController,
  listUserFavoritesController,
  listUserJobsController,
  listUserRecolocationController,
  registerUserController,
  showUserController,
  updateUserAvatarController,
  updateUserController,
} from '../factories/AccountsControllersFactory';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { AccountsValidators } from '../validators/AccountsValidators';

const accountsRouter = Router();
const uploadAvatar = multer(uploadConfig.upload);

accountsRouter.post(
  '/',
  CelebrateAdapter.apply(AccountsValidators.BODY),
  ExpressAdapter.create(registerUserController.handle),
);

accountsRouter.use(EnsureAuthenticated.handle);

accountsRouter.get('/', ExpressAdapter.create(listUserController.handle));

accountsRouter.get('/infos', ExpressAdapter.create(showUserController.handle));

accountsRouter.get(
  '/:id/infos',
  CelebrateAdapter.apply(AccountsValidators.ID_PARAM),
  ExpressAdapter.create(showUserController.handle),
);

accountsRouter.put(
  '/',
  CelebrateAdapter.apply(AccountsValidators.BODY_UPDATE),
  ExpressAdapter.create(updateUserController.handle),
);

accountsRouter.get(
  '/favorites',
  ExpressAdapter.create(listUserFavoritesController.handle),
);

accountsRouter.get(
  '/jobs',
  ExpressAdapter.create(listUserJobsController.handle),
);

accountsRouter.delete(
  '/',
  ExpressAdapter.create(deleteAccountController.handle),
);

accountsRouter.patch(
  '/recolocation',
  ExpressAdapter.create(changeUserRecolocationController.handle),
);

accountsRouter.get(
  '/recolocation',
  ExpressAdapter.create(listUserRecolocationController.handle),
);

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
