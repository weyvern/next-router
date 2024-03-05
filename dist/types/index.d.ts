import type { NextRequest } from 'next/server';
declare class ErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
type NextCustomMiddleware = (request: NextRequest, routes: NextRouteParams, next: NextHandler) => Promise<Response | void>;
type NextHandler = () => Promise<void>;
type NextRouteParams = {
    params: Record<string, string>;
};
export { ErrorHandler, NextCustomMiddleware, NextHandler, NextRequest, NextRouteParams };
