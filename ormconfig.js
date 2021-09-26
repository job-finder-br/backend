require('dotenv').config();

const rootDir = process.env.NODE_ENV === 'production' ? './build' : './src';

const POSTGRES_SECRETS =
  process.env.NODE_ENV === 'production'
    ? {
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      };

module.exports = {
  name: 'default',
  type: 'postgres',
  logging: false,

  ...POSTGRES_SECRETS,
  entities: [`${rootDir}/modules/**/domain/**/*.{js,ts}`],
  migrations: [`${rootDir}/infra/database/typeorm/migrations/*.{js,ts}`],
  seeds: [`${rootDir}/infra/database/typeorm/seeds/*.{js,ts}`],
  cli: {
    migrationsDir: `${rootDir}/infra/database/typeorm/migrations`,
  },
};
