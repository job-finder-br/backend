import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { ExceptionHandler } from './middlewares/ExceptionHandler';
import { routes } from './routes';

import '@shared/container';
import '@infra/database/typeorm';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(routes);
app.use(ExceptionHandler.handle);

export { app };
