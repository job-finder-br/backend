import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { AppException } from '@shared/errors/AppException';

type TokenPayload = {
  sub: string;
};

class EnsureAuthenticated {
  static handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppException({
        message: 'Missing Bearer Token!',
        statusCode: 401,
      });
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub } = verify(
        token,
        process.env.AUTH_JWT_SECRET_KEY,
      ) as TokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch {
      throw new AppException({
        message: 'This Token is Invalid!',
        statusCode: 401,
      });
    }
  }
}

export { EnsureAuthenticated };
