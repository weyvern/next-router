import { NextCustomMiddleware, NextRequest, NextRouteParams } from '@/types';
export declare const nextAPIHandler: (...middlewares: NextCustomMiddleware[]) => (request: NextRequest, routes: NextRouteParams) => Promise<Response>;
declare class NextRouter {
    #private;
    use(...middleware: NextCustomMiddleware[]): void;
    get(...handlers: NextCustomMiddleware[]): this;
    post(...handlers: NextCustomMiddleware[]): this;
    put(...handlers: NextCustomMiddleware[]): this;
    delete(...handlers: NextCustomMiddleware[]): this;
    handlers(): {
        GET: NextCustomMiddleware;
        POST: NextCustomMiddleware;
        PUT: NextCustomMiddleware;
        DELETE: NextCustomMiddleware;
    };
}
export default NextRouter;
