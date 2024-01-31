import { NextHandler, NextCustomMiddleware, NextRequest, NextRouteParams } from '@/types';

export const nextAPIHandler = (...middlewares: NextCustomMiddleware[]) => {
  return async (request: NextRequest, routes: NextRouteParams) => {
    try {
      let result: void | Response;

      for (const middleware of middlewares) {
        let nextInvoked = false;
        const next: NextHandler = async () => {
          nextInvoked = true;
        };
        result = await middleware(request, routes, next);
        if (!nextInvoked) {
          break;
        }
      }

      if (result) return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }
  };
};

class NextRouter {
  #middleware: NextCustomMiddleware[] = [];

  #GET: NextCustomMiddleware;

  #POST: NextCustomMiddleware;

  #PUT: NextCustomMiddleware;

  #DELETE: NextCustomMiddleware;

  use(...middleware: NextCustomMiddleware[]) {
    this.#middleware.push(...middleware);
  }

  get(...handlers: NextCustomMiddleware[]) {
    this.#GET = nextAPIHandler(...this.#middleware, ...handlers);
    return this;
  }

  post(...handlers: NextCustomMiddleware[]) {
    this.#POST = nextAPIHandler(...this.#middleware, ...handlers);
    return this;
  }

  put(...handlers: NextCustomMiddleware[]) {
    this.#PUT = nextAPIHandler(...this.#middleware, ...handlers);
    return this;
  }

  delete(...handlers: NextCustomMiddleware[]) {
    this.#DELETE = nextAPIHandler(...this.#middleware, ...handlers);
    return this;
  }

  handlers() {
    return {
      GET: this.#GET,
      POST: this.#POST,
      PUT: this.#PUT,
      DELETE: this.#DELETE
    };
  }
}

export default NextRouter;
