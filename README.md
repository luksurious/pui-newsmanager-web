# Angular application for the News Manager project
for 'Programming of User Interfaces'

**Note**: There are two different versions of this project available: the standard version which requires a web server (a dev server is provided through npm), and a serverless version. See below for details on both versions.

## Structure
- `src/news` contains all the news specific AngularJS code
    - `components` contains directives
    - `pages` contains the templates and controllers for the different pages
    - `services` contains the services
- `src/common` contains shared code, not directly related to the news application, abstracting most external dependencies
- `public` contains the `index.html` which contains the main layout

## Standard version
This version integrates many recommended tools for developing AngularJS applications:
- npm
- webpack
- postcss
- babel
- webpack dev server

Webpack "compiles" all JavaScript files into a single file, using Babel on the way to translate newer JavaScript features for all expected browsers. With PostCSS we can just import CSS inside JavaScript, which will then be automatically served to the HTML without explicitly linking it.

One advantage of this version is that it uses Html5 mode for the routes, so no "#!" routing is needed.

### Requirements
In order to take advantage of this version you must have installed NodeJS and npm available
* node 8+ with npm

### Set up
1. Install dependencies via `npm install`
2. Create a proper configuration file: Copy `src/news/config.dist.js` to `src/news/config.js` and fill the proper api key and api url.
   **Note:** This is already prepared for this submission.


### Quick start
1. Run `npm run server`
2. Open http://localhost:8080

This starts a webpack-dev-server with hot-reloading if any changes are made. Note that this does not minify files, so it is not good for production use.

### Production
1. Run `npm run build`
2. The compiled files are found in the `/dist` folder. It can then be served through any web server.


## Serverless version
This version can be deployed without any server. However, without a server, using Html5 mode is more tricky, so it is disabled (because a fixed base-href needs to be provided).

Because of security restrictions, the `index.html` lives in the root directory, and it only works in Firefox.

If `npm` is not available, the necessary `node_modules` are provided out-of-the-box.

## Code details and gotchas

