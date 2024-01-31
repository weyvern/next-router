"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nextAPIHandler = (...middlewares) => {
    return async (request, routes) => {
        try {
            let result;
            for (const middleware of middlewares) {
                let nextInvoked = false;
                const next = async () => {
                    nextInvoked = true;
                };
                result = await middleware(request, routes, next);
                if (!nextInvoked) {
                    break;
                }
            }
            if (result)
                return result;
        }
        catch (e) {
            if (e instanceof Error) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }
    };
};
class NextRouter {
    #middleware = [];
    #GET;
    #POST;
    #PUT;
    #DELETE;
    use(...middleware) {
        this.#middleware.push(...middleware);
    }
    get(...handlers) {
        this.#GET = nextAPIHandler(...this.#middleware, ...handlers);
        return this;
    }
    post(...handlers) {
        this.#POST = nextAPIHandler(...this.#middleware, ...handlers);
        return this;
    }
    put(...handlers) {
        this.#PUT = nextAPIHandler(...this.#middleware, ...handlers);
        return this;
    }
    delete(...handlers) {
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
exports.default = NextRouter;
