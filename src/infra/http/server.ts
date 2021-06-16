import 'dotenv/config';
import { Logger } from '@shared/Logger';

import { app } from './app';

const { API_PORT } = process.env;

app.listen(API_PORT, () => {
  Logger.info(`🟩 Server starting on port ${API_PORT}!`);
});
