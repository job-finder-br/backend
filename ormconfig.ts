import 'dotenv/config';

const POSTGRES_PORT =
  process.env.NODE_ENV === 'dev'
    ? process.env.POSTGRES_PORT_EXTERNAL
    : process.env.POSTGRES_PORT;

export default {
  type: 'postgres',
  host: 'localhost',
  logging: true,
  port: POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['./src/modules/**/domain/**/*.ts'],
  migrations: ['./src/infra/database/**/migrations/*.ts'],
  seeds: ['./src/infra/database/**/seeds/*.ts'],
  cli: {
    migrationsDir: './src/infra/database/typeorm/migrations',
  },
};
