import 'express-async-errors';
import 'reflect-metadata';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { routes } from './routes';

import '@shared/container';
import '@infra/database/typeorm';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(routes);

export { app };
