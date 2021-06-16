import 'dotenv/config';

const rootDir = process.env.NODE_ENV === 'production' ? './build' : './src';

module.exports = {
  name: 'default',
  type: 'postgres',
  logging: true,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [`${rootDir}/modules/**/domain/**/*.{js,ts}`],
  migrations: [`${rootDir}/infra/database/typeorm/migrations/*.{js,ts}`],
  seeds: [`${rootDir}/infra/database/typeorm/seeds/*.{js,ts}`],
  cli: {
    migrationsDir: `${rootDir}/infra/database/typeorm/migrations`,
  },
};
