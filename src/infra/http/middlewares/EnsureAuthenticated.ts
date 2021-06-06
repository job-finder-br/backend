import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

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
      return response.status(401).json({
        message: 'Missing Bearer Token!',
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
      return response.status(401).json({
        message: 'This Token is Invalid!',
      });
    }
  }
}

export { EnsureAuthenticated };
