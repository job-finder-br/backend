import { Router } from 'express';

import { ExpressAdapter } from '@infra/http/adapters';

import {
  registerJobWorkController,
  favoriteJobController,
  listJobsWorkController,
  removeFavoriteJobController,
  showJobWorkController,
  deleteJobWorkController,
  updateJobWorkController,
} from '../factories/JobsWorkControllersFactory';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const jobsRouter = Router();

jobsRouter.get('/', ExpressAdapter.create(listJobsWorkController.handle));

jobsRouter.use(EnsureAuthenticated.handle);

jobsRouter.post('/', ExpressAdapter.create(registerJobWorkController.handle));

jobsRouter.put('/:id', ExpressAdapter.create(updateJobWorkController.handle));

jobsRouter.get('/:id', ExpressAdapter.create(showJobWorkController.handle));

jobsRouter.delete(
  '/:id',
  ExpressAdapter.create(deleteJobWorkController.handle),
);

jobsRouter.post(
  '/like/:id',
  ExpressAdapter.create(favoriteJobController.handle),
);

jobsRouter.delete(
  '/dislike/:id',
  ExpressAdapter.create(removeFavoriteJobController.handle),
);

export { jobsRouter };
