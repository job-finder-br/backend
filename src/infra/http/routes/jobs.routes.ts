import { Router } from 'express';

import { ExpressAdapter } from '@infra/http/adapters';

import { CelebrateAdapter } from '../adapters/CelebrateAdapter';
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
import { JobsValidators } from '../validators/JobsValidators';

const jobsRouter = Router();

jobsRouter.get('/', ExpressAdapter.create(listJobsWorkController.handle));

jobsRouter.use(EnsureAuthenticated.handle);

jobsRouter.post(
  '/',
  CelebrateAdapter.apply(JobsValidators.BODY),
  ExpressAdapter.create(registerJobWorkController.handle),
);

jobsRouter.put(
  '/:id',
  [
    CelebrateAdapter.apply(JobsValidators.ID_PARAM),
    CelebrateAdapter.apply(JobsValidators.BODY),
  ],
  ExpressAdapter.create(updateJobWorkController.handle),
);

jobsRouter.get(
  '/:id',
  CelebrateAdapter.apply(JobsValidators.ID_PARAM),
  ExpressAdapter.create(showJobWorkController.handle),
);

jobsRouter.delete(
  '/:id',
  CelebrateAdapter.apply(JobsValidators.ID_PARAM),
  ExpressAdapter.create(deleteJobWorkController.handle),
);

jobsRouter.post(
  '/like/:id',
  CelebrateAdapter.apply(JobsValidators.ID_PARAM),
  ExpressAdapter.create(favoriteJobController.handle),
);

jobsRouter.delete(
  '/dislike/:id',
  CelebrateAdapter.apply(JobsValidators.ID_PARAM),
  ExpressAdapter.create(removeFavoriteJobController.handle),
);

export { jobsRouter };
