/* eslint-disable @typescript-eslint/no-unused-vars */
import { CelebrateError } from 'celebrate';
import { Response, Request, NextFunction } from 'express';

import { CelebrateMapper } from '../adapters/CelebrateAdapter';

type ValidationCelebrateErrors = {
  [key: string]: any;
};

class ExceptionHandler {
  static handle(
    err: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ): Response {
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
