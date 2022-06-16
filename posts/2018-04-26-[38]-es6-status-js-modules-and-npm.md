---
title: "ES6 Status - JS modules and npm"
date: "2018-04-26"
---

### JavaScript Modules & Webpack Tool Setup

[npmjs](https://www.npmjs.com/)

Modules are pretty rad-- a file made up of functions and such capable of being used across files/ applications.

Ex:

```
import slug from 'slug';
import { uniq, shuffle } from 'lodash';

```

Instead of using script tags, able to snag existing modules, full or cherry-picked as with the uniq/shuffle methods from lodash.

Now, although ES6 has support across browsers support lacks in the module dept. Tooling is needed to be able to use the syntax/import/export modules.

_So, what's needed?_

- set up a `package.json` file that will allow us to install external dependencies from npm
- and webpack which will bundle up all JS together.

Note: there are diff ways to get modules- bower, jspm, but seems npmjs has become the standard way to go.

To get started,

- create an `app.js` file
- and then a file to initialize npm `package.json`, `npm init`
  some questions will pop up to get a basic setup, you can edit/update after
  this file will reference any packages installed

For instance, slug mentioned above `npm install slug --save` will alter `package.json` to show slug under dependencies and a `node_modules` folder that holds dependencies.

Note: if `node_modules` folder is ever deleted, `npm install` will reinstall dependencies.

- create an html file to load in `app.js`
  no loading imports through usual script tags, as mentioned above it hasnt been implemented (es6)
  using webpack will bundle it all up

### webpack

There are boiler plates online, but tend to be somewhat confusing

`npm install webpack --save-dev` (check version and all its goodness => [npmjs-webpack](https://www.npmjs.com/package/webpack))
^ since it's a development tool to build app, not part of it `--save-dev`
once it runs and all that, should pop up in `package.json` file under devDependencies

_What else do we need?_
A couple of things to convert to ES5...

- Babel, which will convert ES6 code to ES5 equivalent
  `install webpack babel-loader babel-core babel-preset-es2015-native-modules --save`

Should have all popped up under devDependecies in `package.json`

- Webpack config file, `webpack.config.js`

```
  const webpack = require('webpack');
  const nodeEnv = process.env.NODE_ENV || 'production';

  module.exports = {
    devtool: 'source-map',
    // where app starts
    entry: {
      filename: './app.js`
    },
    // where will it go
    output: {
      filename: '_build/bundle.js'
    },
    module: {
      // how to handle certain files
      loaders: [
        {
          test: /\/.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            // webpack2 doesnt need es6 converted to commonJS, knows how to handle es6 modules, hence native modules
            presets: ['es2015-native-modules']
          }
        }
      ]
    },
    plugins: [
      // uglify - compresses js
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: true
      })
      // env plugin - set env
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv)}
      })
    ]
  }

```

To run webpack:

    - able to run from command line or
    - install globally, or
    - run from a script (check out `package.json`, there's a scripts section)

Putting `"build": "webpack --progress --watch"` now able to run `npm run build` that runs webpack config goodness

Rewinding back to html file, swap src script to `"_build/bundle.js"`

Now, w.e you throw into `app.js`, regarding using things like `uniq`, hitting save should run webpack bundle

### Creating Own Modules

`config.js` ex:

```
const apiKey = 'abc123';

```

`app.js`

```
// grabbing^ api key from another file
import apiKey = './src/config';

```

Note: variables are not global with modules, always scoped to function, block, or module.

Since it is not a node module, but a local file you can import using a relative path (.js/ext not needed)

Able to export in 2 ways, 'default export' or 'named export':
`config.js` -- `default export` ex:

```
const apiKey = 'abc123';

export default apiKey;

```

and import like previous example.

Note: If you load html file in browser and console.log(apiKey) you'll see example api key used. Also, exporting as default allows you to name it whatever you'd like on import. Any module can only have ONE default export.

`config.js` -- `named export` ex:

```
export const apiKey = 'abc123';

```

`app.js`

```
// grabbing^ api key from another file
import { apiKey, canAddMoreNamedExports, likeThis } = './src/config';

```

Note: import differs from previous example when exporting named export by using curly braces. To add more named exports, add them inside those same curly braces.

Note 2: You can also export functions, variable names. Also, able to rename. `import apiKey as key = './src/config';`

References:
[MDN - export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

### MOAAAR ES6 Module Example

coding along...
to make a user module w/ some utility methods

`src/user.js`

```
// imports go in w.e file needed even if already imported elsewhere, will not dup code

import slug from 'slug';
import { url } from './config';

// import below able to be renamed, creator of base-64 exported as a default which gives ability of importing with any name
import base64 from 'base-64';

export default function User(name, email, website) {
  // when props name and var are the same no need to be redundant
  return { name, email website };
}

export function createURL(name) {
  return `${url}/users/${slug(name)}`;
}

// here npm base64 is needed, base64 hash of user email follows main url
export function gravatar(email) {
  const hash = base64.encode(email);
  const photoURL = `https://www.gravatar.com/avatar/${hash}`;
  return photoURL
}

```

module^ ready to use in other files--
default export added to 'main' User fn, while others are named exports.

add import to `app.js` to use:

```
import User, { createURL, gravatar } from './src/user';

const userInfo = new User('jo', 'emailHere@email.com', 'websiteHere.com' );
const profile = createURL(userInfo.name);
const image = gravatar(userInfo.email);

```

loading html in browser and `console.log`-ing variables output info

Note: you can make your own modules and put them up on npm :O

SN(N2FS): I'd like to take a moment to remember the first time I tried to wrap my brain around package.json and modules and all this jazz, I had jumped into the deep end trying to incorporate gulp into jekyll. This revisiting... I follow and dig it. Putting this here to remind my future self, progress :)
