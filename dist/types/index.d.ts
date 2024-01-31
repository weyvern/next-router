import type { NextRequest } from 'next/server';
type NextCustomMiddleware = (request: NextRequest, routes: NextRouteParams, next: NextHandler) => Promise<Response | void>;
type NextHandler = () => Promise<void>;
type NextRouteParams = {
    params: Record<string, string>;
};
export { NextCustomMiddleware, NextHandler, NextRequest, NextRouteParams };
