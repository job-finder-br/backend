/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppException } from '@shared/errors/AppException';
import { CelebrateError } from 'celebrate';
import { Response, Request, NextFunction } from 'express';

import { CelebrateMapper } from '../adapters/CelebrateAdapter';

type ValidationCelebrateErrors = {
  [key: string]: any;
};

class ExceptionHandler {
  static handle(
    err: Error | any,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ): Response {
    if (err instanceof AppException || Error) {
      if (!err.statusCode) {
        return response.status(400).json({
          status: 'error',
          message: err.message,
        });
      }

      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    if (err instanceof CelebrateError) {
      const CelebratePropsErrors: ValidationCelebrateErrors = new Map();

      err.details.forEach((value, key) => {
        CelebratePropsErrors[key] = value;
      });

      const { details: deailsCelebrateErrors } =
        CelebratePropsErrors.body ||
        CelebratePropsErrors.headers ||
        CelebratePropsErrors.cookies ||
        CelebratePropsErrors.params ||
        CelebratePropsErrors.query ||
        CelebratePropsErrors.signedCookies;

      return response
        .status(422)
        .json(CelebrateMapper.renderMany(deailsCelebrateErrors));
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`,
    });
  }
}

export { ExceptionHandler };
