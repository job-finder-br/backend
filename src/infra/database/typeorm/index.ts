import { Connection, createConnection, getConnectionOptions } from 'typeorm';

import { Logger } from '@shared/Logger';

getConnectionOptions().then(options => {
  createConnection({
    ...options,
  })
    .then((connection: Connection) => {
      Logger.info(`🟩 Database ${connection.name} Connection Successful!`);
    })
    .catch((error: Error) => {
      Logger.fatal(`🟥 Database ${error.message} Connection failed!`);
    });
});
