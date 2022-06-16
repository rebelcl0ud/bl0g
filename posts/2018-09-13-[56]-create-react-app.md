---
title: "Create React App w/o create-react-app"
date: "2018-09-13"
---

I attempted to create a React app without using create-react-app; I got it working, sorta, working backwards using an app created using create-react-app.

But, I found another snazzy video by Tyler on YouTube covering the topic so what follows is me going through the process :D

# React w/o create-react-app juju

Some handy docs: - [react](https://reactjs.org/docs/hello-world.html) - [webpack](https://webpack.js.org/configuration/) - [babel](https://babeljs.io/docs/en/presets)

## first things first

`mkdir` name it whatever your little heart desires. Make your way to the folder you created and hit `npm init -y`. Previously, I've made a note/mention about what that does, but memory is only human and imperfect so here it is again... `npm init -y` creates the `package.json` file in one shot instead of asking you 21 Qs (without the `-y`).

## install some stufffffsssss

`npm install react react-dom` will install `react` library and `react-dom` library. Once that's all good check out your `package.json` file, there should be 2 dependencies and they should be what you just installed _w00t_. There's also a `node_modules` folder which has other libraries that our packages need in order to do their thing.

Note: the `node_modules` is something that you don't want bogging down repos up on github or someone downloading repo- create a `.gitignore` file.

## .gitignore

For me, `touch .gitignore` creates that awesome file I mentioned above where I can state what I want _git_ to _ignore_. To start, let's kick off the file setup by adding `node_modules`, `DS_Store` (cuz I'm on a mac), and `dist` folder which will contain code output that has ran through webpack/babel and all that jazz.

Sidebar: _what's up with having `react` and `react-dom`?_ React can be used outside of just the DOM. Example: React Native, able to build native apps in iOS and Android using React. Seperating React from the React Renderer allows rendering to different targets other than the DOM, like an Xbox.

## building blocks

Another folder to add to the mix, `mkdir app` and inside the folder `touch index.css` and `touch index.js`. Note: you can create them together `touch index.css index.js`

## index.js basic setup

```
const React = require('react');
const ReactDOM = require('react-dom');
require('index.css')

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>hebwooooo</h1>
			</div>
		)
	}
}

ReactDOM.render( <App />, document.getElementById('app') )

```

So, _what's happening up there?_ Requiring `react`, `react-dom`, and `'index.css` pulls in all that goodness into `index.js` file allowing what follows-- the `App` component and `ReactDOM.render()`. There is no css to pull in, but when there is some because the file was required in here styling will show up.

Note: As-is, the above file will not be understood by browser. For that we need some babel and webpack goodness (coming up next). Also, we haven't set up the `app` id for `<App />` to be rendered to.

## welcome babel & webpack

`npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin`

Fun Fact: I tried to set up a React app myself, reverse engineering one created using create-react-app...

After installing is done, `touch webpack.config.js`

### webpack

_what does webpack do?_ It combines all modules into one single file/module which can then be referenced in html file.

```
const path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
		]
	},
	mode: 'development',
}

```

Webpack setup above starts with `const path = require('path');`, there's nothing to install, it lives within the app. All you're doing here is pretty much requiring it to come out and play.

Then, a `module.export={}` object that will contain all webpack sauce. Starting with an `entry` point which is the main file being worked on, kinda like HQ (headquarters). Now, once webpack does its thing it needs a place to put it... hello, `output`!

`output` will be an object that will include `path: path.resolve(__dirname, 'dist')` and `filename: 'index_bundle.js'`. Once webpack snags all that is `index.js`, what it combines into a single file will output/end up in the `index_bundle.js` file that will live in the `dist` folder which it will create. => `jotube/dist/index_bundle.js`

The next object, `modules` will contain `rules` which is essentially telling webpack what transformations it needs to do before spitting out `index_bundle.js` file. For example, transform all es6+ and JSX into JS browsers will understand.

```
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
		]
	}
```

Run `babel-loader` on any `.js` file found and run `style-loader` and `css-loader` on any `.css` file found.
_What does css-loader and style-loader do?_
`css-loader` looks for any css and transform it into a `require`

`style-loader` will take the css that is being required and insert it directly into the page activating styles on that page.

`mode:` can be `'development'` or `production`

Next, has to do with `"html-webpack-plugin"`-- I think I mentioned before that we have told `ReactDOM.render()` to render `<App/>` component to `id` of `app` which doesn't exist yet. So, let's get that going first with `touch app/index.html` in terminal. There should now be a new file, `index.html` in the `app` folder. Within that file, throw in the basics, something like the following:

```
<!DOCTYPE html>
<html>
<head>
	<title>eeeooooo</title>
</head>
<body>
	<div id="app"></div>
</body>
<html>
```

Webpack, as previously stated, will combine all the awesome into one file (`index_bundle.js`). I expect, the above HTML file should be one of those files taken in as well. In other words, there should be an HTML file within that `dist` folder along with `index_bundle.js`. Which brings me back to `"html-webpack-plugin"` (listed in the `package.json` file under `devDependencies`), which allows the generation of an HTML file which will then include a reference to `index_bundle.js`

In `webpack.config.js` we add another require, `const HtmlWebpackPlugin = require('html-webpack-plugin');` and add a `plugins` section that takes an array (since it is possible to have multiple plugins). In that array, create a new instance of `HtmlWebpackPlugin` that will take a template, the `index.html` file created earlier.

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports= {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html'
		})
	]
};
```

Another thing mentioned, I think, in regards to `babel-loader` is that it will compile all things javascript. In addition to that tidbit, the `package.json` file under dev dependencies, `@babel/preset-env` will allow `class` syntax used/transformed into constructor functions that older browsers can use (located within `index.js` file) while `@babel/preset-react` which is charge of JSX transformations.

Although they are installed as dev dependencies, the way to actually use them is by adding a babel property within the same file, `package.json`. Snippet below:

```
  "main": "index.js",
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  },
```

The presets are an array; you can specify multiple transformations we want Babel to do.

Now, when webpack runs it will compile files using `babel-loader` in `webpack.config.js` file itself based on the presets specified within `package.json` (see: snippet above).

What webpack will now return will be JS all browsers can understand. _So, are we gonna test this out or what?_ Yes! Remove the `test` line under `scripts` and add a temp, `create`. Check out snippet below:

```
  "main": "index.js",
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  },
  "scripts": {
    "create": "webpack"
  },
```

`npm run create` will start up webpack which will take file at entry point, run transformations, and spit out `dist` folder with `index_bundle.js` and `index.html` file inside.

Note: if you get errors double check for missing commas, typos in spelling or paths... I had export instead of exports and needed to have css file I was requiring written as a path, not just file; ex: ./index.css instead of index.css. _Errors in the terminal are your friends_ Deleted the dist folder and ran `npm run create` one more time which recreated dist folder.

## webpack server

Yesss! `webpack-dev-server` makes it so you don't have to keep starting up webpack at every change. Instead of bundling all modules together and outputting into dist folder it will do so inside local cache, which is faster.

Heading back to `package.json` file:

```
 "scripts": {
    "start": "webpack-dev-server --open"
  },
```

replaces previous (which was placed only for the sake of quick test)

```
 "scripts": {
    "create": "webpack"
  },
```

The former script will run `webpack-dev-server` and open browser at w.e port used. By default, I believe, it's 8080.

However, my particular setup tends to need to have 3000 specified, which then forwards to 3030. Adding this to my webpack file worked for me:

```
devServer: {
	host:'0.0.0.0',
	port: 3000
}
```

and a slight change in `package.json` file: `"start": "webpack-dev-server --open --watch-poll"`

It doesn't do live reload changes, but a refresh of the browser shows updates.

Resources: - https://webpack.js.org/configuration/dev-server/#devserver-host - https://webpack.js.org/configuration/dev-server/#devserver-port - https://webpack.js.org/guides/development-vagrant/

Even if those links aren't exactly what you need, it still leads to the docs where you can peruse at your leisure and find (hopefully) whatever solution to what ails you.

## when sh1t gets weird

When I started adding the building block components for my app and opened up the browser console...

I had CORS errors popping up and I just _didn't get it_ because, well, I hadn't set up any API calls yet, just 2 simple components. So I went back to the Webpack docs and thought (after being like whuuuuut for a couple of hours)... the default port on this is 8080 and although I have had to state port due to the setup I'm working on (it forwards 3000 to 3030) in previous projects...

_and_ which I had done on this one _and_ worked... I hadn't looked at the console tab in the browser... so I hadn't seen the errors...

So, I changed up the webpack file to say 8080 instead of 3000, restarted webpack and lo and behold it worked _annnnnd_ it does that fancy live reload jazz. w00t!

Lesson of the day: don't assume sh1t lol
