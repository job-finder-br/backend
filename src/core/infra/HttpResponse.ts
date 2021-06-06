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

export const clientError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message,
  },
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: {
    error: error.message,
  },
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: {
    error: error.message,
  },
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: {
    error: error.message,
  },
});

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: {
    error: error.message,
  },
});

export const tooMany = (error: Error): HttpResponse => ({
  statusCode: 429,
  body: {
    error: error.message,
  },
});

export const fail = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: {
    error: error.message,
  },
});
