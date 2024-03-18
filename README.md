# Full-Stack Sample

Full-stack application to view and retrieve orgs and repositories.
Repo is hosted on Github [here](https://github.com/streetchief/full-stack-sample).

## Installation

```sh
git clone https://github.com/streetchief/full-stack-sample.git
cd full-stack-sample
yarn
cp ./src/server/secrets.sample.json ./src/server/secrets.json
```

Add your Github key inside the `secrets.json` file for advanced Github API access.

## Operation

`yarn dev` to start the development server which defaults to [port 3000](http://localhost:3000/).

Unfortunately, using `tsx` for `vite-express` seems to break some of the watching capabilities of Vite. Making server side changes triggers a reset in the front end, which happens before the express server is loaded, causing a 'Cannot GET /` error. A simple reload allows Vite to reconnect, but this is less than ideal, and would be fixed for long term usage.

## Testing

`yarn test` to run the limited test suite.

## Decisions

### Technical

- Examined [Remix](https://remix.run), [Vite](https://vitejs.dev), and [Babel](https://babeljs.io/).
- Went with Vite for fast React + Typescript development front-end development with Hot Module Reloading (HMR) and configuration simplicity to save time setting up react/typescript transpilation.
- Used the Vite-Express library for a basic Express.js router to integrate with Vite.
- Created Github Personal Access Token (PAT) for Github API access for access control.
- Bootstrap for "fast" styling; generally prefer custom css to as not to fight against the pre-determined styles as edge cases arise. Sass is nice for nesting rules, and additional functions.

### Functional

- Skip branches for speed and pushing straight to main; preferred method is trunk based development.
- I enjoy functional grouping of source code, e.g. `./src/server/routes/github/` contains all github api access code in a single place. This makes it very easy to find relevant code.
- I like adding functional descriptions to files, e.g. `github.adapter.ts`, `github.router.ts`, etc.. This makes it easy to parse and locate relevant code.

## Dependencies

### Core

- [Node](https://nodejs.org/docs/latest-v18.x/api/index.html) - Server runtime
- [Yarn](https://yarnpkg.com/) - Package manager
- [Vite-Express](https://github.com/szymmis/vite-express) - Vite front end and express backend
- [Octokit](https://github.com/octokit/octokit.js) - Access Github API
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Fast styling
- [Jest](https://jestjs.io/) - testing framework

### API

- [Github API docs](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- [Github get org](https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization)
- [Github pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28)

## TODO

- Display front-end errors to user.
- Infra changes to clean up the back-end watching behavior.
- Pagination and filtering on the front end.
- Allow site users to navigate the repository information more.
- Allow repo README previews.
- Utilize [React/Tanstack Query](https://tanstack.com/query/latest) for front-end network fetching management.
- Everything that can be automated, should be.

## Production

There are many steps that would be required for deployment and production release. Both Vite and Express have specific requirements listed below. Additionally, as a typescript project, we would ideal transpile the project ahead of time, and only ship the required javascript and other files necessary for runtime operation.

- [Vite-Express Production Config](https://github.com/szymmis/vite-express#-shipping-to-production)
- [Node production best practices](http://expressjs.com/en/advanced/best-practice-performance.html)
