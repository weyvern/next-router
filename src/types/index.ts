import type { NextRequest } from 'next/server';

class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

type NextCustomMiddleware = (
  request: NextRequest,
  routes: NextRouteParams,
  next: NextHandler
) => Promise<Response | void>;

type NextHandler = () => Promise<void>;

type NextRouteParams = {
  params: Record<string, string>;
};

export { ErrorHandler, NextCustomMiddleware, NextHandler, NextRequest, NextRouteParams };
