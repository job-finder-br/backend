import { Router } from 'express';

import { accountsRouter } from './accounts.routes';
import { categoryRouter } from './category.routes';
import { jobsRouter } from './jobs.routes';
import { authenticateRouter } from './sessions.routes';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/sessions', authenticateRouter);
routes.use('/jobs', jobsRouter);
routes.use('/categories', categoryRouter);

export { routes };
