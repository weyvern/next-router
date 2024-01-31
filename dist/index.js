"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextAPIHandler = void 0;
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
exports.nextAPIHandler = nextAPIHandler;
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
        this.#GET = (0, exports.nextAPIHandler)(...this.#middleware, ...handlers);
        return this;
    }
    post(...handlers) {
        this.#POST = (0, exports.nextAPIHandler)(...this.#middleware, ...handlers);
        return this;
    }
    put(...handlers) {
        this.#PUT = (0, exports.nextAPIHandler)(...this.#middleware, ...handlers);
        return this;
    }
    delete(...handlers) {
        this.#DELETE = (0, exports.nextAPIHandler)(...this.#middleware, ...handlers);
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
