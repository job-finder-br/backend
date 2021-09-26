import { AppException } from '@shared/errors/AppException';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpResponse = {
  statusCode: number;
  body: any;
};

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: undefined,
});

export const ok = <T>(dto?: T): HttpResponse => ({
  statusCode: 200,
  body: dto,
});

export const created = <T>(dto?: T): HttpResponse => ({
  statusCode: 201,
  body: dto,
});

export const clientError = (error: AppException): HttpResponse => ({
  statusCode: error.statusCode,
  body: {
    status: 'error',
    message: error.message,
  },
});
