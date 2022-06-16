---
title: "ES6 Status - Tooling"
date: "2018-04-30"
---

Resources:

- [systemjs](https://github.com/systemjs/systemjs)

- [browser-sync](https://www.browsersync.io/docs/)

webpack not only way to bundle up js/ es6 modules-- browserfy, rollup, systemjs

SystemJS works with jspm, a package manager built on-top of npm. Cool feature is the possibility to run in-browser. Instead of full setup, able to load in through script tag.

Note: you need to run through a server

BrowserSync Sidebar:

    - npm init
    - npm install browser-sync --save-dev
    - go to package.json
     - delete test line under scripts
     - add "server": "browser-sync start --directory --server --files '*.js, *.html, *.css' "

If all went well, `browser-sync` should have popped up under `devDependencies` in `package.json`

`npm run server` should have you up and running

Back to the whole systemjs stufffff:

After you got a server and have systemjs loaded through a script tag, in the body of html file

```
<script>
  System.config({ transpiler: 'babel' });
  System.import('./main.js');
</script>
```

you add transpiler and entry point, similar to `app.js`, it can be named w.e, it's basically your main file it will be grabbing from.

You can test out stuff is working with a `console.log('whadduppp')` message placed inside `main.js` file that should show up

no npm install/setup stuff, but able to import methods and such as usual with a slight difference

this, `import { sum, kebabCase } from 'lodash'` to this `import { sum, kebabCase } from 'npm:lodash'`

you can test above import with a `console.log(kebabCase(Boom this works));`

should show up in console as `boom-this-works`

and works with personal modules as well-- `export` before `fn` in module and `import` in `main.js`

Note: not ideal for production, but good for testing, quick mockups, and such

### babel + npm

Resources:
[babeljs](https://babeljs.io/)
[test drive - babeljs](https://babeljs.io/repl/)

Note: you only need webpack, system, browserfy for modules only-- simpler setup if not making use of modules

    - npm init
    - npm install babel-cli@next
     - @next needed? check out version [npmjs](https://www.npmjs.com/package/babel-cli)
    - go to package.json
     - remove test line under scripts
     - add

`"babel": "babel main.js --watch --out-file app-compiled.js"`

Installing plugins + presets:

Instead of going through/ selecting plugins and such for conversion and all that, babel-preset-env makes things a bit easier where it auto determines what plugins/polyfills you may need based on browser or runtime env.

Resources:
[babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)

    - npm i babel-preset-env@next (next is for latest/beta, you can check version)
    - open package.json
     - under dependencies section
     - add

```
"babel": {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          // The % refers to the global coverage of users from browserslist
          "browsers": [
            ">0.25%", "not dead"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "syntax-object-rest-spread"
  ]
},
```

`npm run babel` will spit out a `app-compiled.js` file that will contain polyfill version code of es6 code in, let's say, `main.js` file, `app.js` file, or w.e main file being used.

Note: `.babelrc`, config what browsers you want to support or plugins/presets is the alternative to including it in the `package.json` file

Example- adding plugins in support of experimental features: - `npm install --save-dev babel-plugin-syntax-object-rest-spread`
recource: [object-spread](https://babeljs.io/docs/plugins/syntax-object-rest-spread/#top) - snag plugin code to throw into `package.json` file or `.babelrc` file (check above snippet)

### polyfilling for older browsers

Babel converts/compiles es6 to es5; works on new syntax, what it looks/acts like. However, methods like `array.from()`, babel doesn't convert.

This is where polyfill comes in, which means, if the browser does not have it then it must be recreated with regular JS.

[MDN](https://developer.mozilla.org/en-US/) shows polyfill options examples

Resources:
Polyfill options to include in projects:

- [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)

- [polyfill.io](https://polyfill.io/v2/docs/)
