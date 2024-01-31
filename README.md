# NextRouter

A small utility to create an Express-like router object that allows you to pipe middlewares and router handlers for `api routes` in the `app` directory Next.JS version `14.1`

## Context

As to Next.JS version `14.1`, you need to generate a `route.ts` or `route.js` file and export a method named after the HTTP verbs you want to support:

```tsx
// In route.ts file

export const GET: NextCustomMiddleware = () => {};
export const PUT: NextCustomMiddleware = () => {};
export const DELETE: NextCustomMiddleware = () => {};

// or

const GET: NextCustomMiddleware = () => {};
const PUT: NextCustomMiddleware = () => {};
const DELETE: NextCustomMiddleware = () => {};

export { GET, PUT, DELETE };
```

Since we need to run the same logic across different routes and methods, we wanted something that would resemble the [Router](https://expressjs.com/en/4x/api.html#router) object in ExpressJS.

## Usage

It’s a custom class that declares `use`, `get`, `put`, `post` and `delete` methods that take a list of `middlewares` / `route handlers` (`NextCustomMiddleware`) and allows us to create an Express-like router:

```tsx
// In route.ts file
import NextRouter from '@weyvern/next-router';
import type {
  NextCustomMiddleware,
  NextHandler,
  NextRequest,
  NextRouteParams
} from '@weyvern/next-router/dist/types';
const router = new NextRouter();

router.use(async (request: NextRequest, routes: NextRouteParams, next: NextHandler) => {
  next();
}); // Middleware that runs on all methods

router
  .get(
    async (request: NextRequest, routes: NextRouteParams, next: NextHandler) => {
      // Another middleware
      next();
    },
    async (request: NextRequest, routes: NextRouteParams) => {
      // you can user request params from routes.params
      Response.json({}, { status: 200, statusText: 'Success' });
    }
  )
  .put(async (request: NextRequest) => {
    Response.json({}, { status: 200, statusText: 'Updated' });
  })
  .delete(async (request: NextRequest) => {
    Response.json({}, { status: 200, statusText: 'Deleted' });
  }); // Every router method returns `this`, that's why it's chainable

export const { GET, POST, DELETE } = router.handlers();
```

Internally, all methods exposed by the class passed the route handlers to an utility called `nextAPIHandler` that's exported by name from the package, i.e. can be imported like:

```tsx
import { nextAPIHandler } from '@weyvern/next-router';
```

It takes `NextCustomMiddleware[]` as parameter and enables us to use `next()` within our `middlewares`! The way it works is quite simple, we iterate over the `middlewares` / `route handlers` passed and declare a `nextInvoked` variable set to `false` , then simply pass a `next` function that can update this value because of the power of ✨closures✨

- ⚠️ Please be mindful that NextJS router handlers are NOT Express router handlers:
  - The first parameters is of type `NextRequest` (exported from `next/server`)
  - The second parameter is where you can get route params.
  - The third parameter is the custom `next` function passed by the `nextAPIhandler`
  - You must return a `Response` explicitly, this is the native object https://nextjs.org/docs/app/building-your-application/routing/route-handlers#extended-nextrequest-and-nextresponse-apis
  - NextJS caches `GET` method that DO NOT use the request object!
