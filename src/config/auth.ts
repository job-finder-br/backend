import 'dotenv/config';

const jwt_secrets = {
  secret: process.env.AUTH_JWT_SECRET_KEY || 'default',
  expiresIn: '1d',
};

export { jwt_secrets };
