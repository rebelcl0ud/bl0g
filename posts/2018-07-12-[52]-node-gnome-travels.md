---
title: "Node Gnome Travels"
date: "2018-07-12"
---

There is this app I've been wanting to incorporate Node into, I don't have much practice with Node so I'm going to document my quest on getting a newsletter set up. I figure it will help me get a little more confident with Node and help me on an unrelated project where I think a newsletter setup may come in handy.

At this point, I got [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) ready to go.

# prep

Go to wherever you want to store your new project. `mkdir` creates a folder, name it whatever your little heart desires.

Navigate into that folder you just created. For me, `cd nodegnome`.

Create a file in there. For me, `touch main.js`. Note: Node docs mention seperating file names with either a `-` or `_`, ex: `main-file-with-multiple-words.js`, so do that if it's longer than one word.

This file (can be named whatever) will be main point of entry to backend. It will be where we set up app, process get/post requests sent to server and such. Later it will also come in to play when adding emails to mailchimp.

Next, creating a `package.json`. This file stores all your project goodness like name, version, dpendencies and all that jazz.

`npm init -y` creates one of those files, adding the `-y` is something I recently picked up that skips the questions and goes straight to file spit out. Note: as always, you can go back and edit the file.

Now, we can start adding dependencies like [Express](https://expressjs.com/).

`npm install express --save` will of course install Express, the `--save` saves as dependency and is used when package is required/essential for app to function. If whatever you are installing is for testing/just for development use `--save-dev`.

## getting main file set up

At the top of `main.js` we bring in the Express module using `const express = require('express');`. This brings in all things required to run Express and storing it in `express` constant/variable.

Now with Express brought in, our next line `const app = express();` initializes Express.

Express will be acting as a web server, we need to give it a port to listen on.

```
app.listen(3000, function() {
	console.log('app is listening...')
})

```

Note: I've been doing my projects within a Vagrant box that forwards 3000 to 3030 localhost, so keep that in mind if in a similar situation.

At the moment, when I run `node main.js` in the terminal and check out `localhost:3030` I get a `Cannot GET /` message in browser. I know the server is working because if you look at the terminal it looks as if it's "stuck" when in reality it's doing its thing. So, the reason this message is showing up is because there hasn't been a route set up.

From the Express docs, "A route method is derived from one of the HTTP methods, and is attached to an instance of the express class."

```
app.get('/', (req,res) => {
	res.end('we now have a res');
})

```

Now, restart the server (you gotta restart after an edit) and refresh the browser... you should see the message 'we now have a res'.

_Do I have to restart the server each time I change the file?_
Restarting the server each time something gets changed can be avoided by using [nodemon](https://www.npmjs.com/package/nodemon). Using this will restart the server for you when it detects a change. w00t! Now, instead of running `node main.js` in terminal, run `nodemon main.js`

Note: if after altering file you go back to the browser and no amount of refresh shows the change try `nodemon -L` [changes aren't being detected](https://github.com/remy/nodemon/blob/master/faq.md#help-my-changes-arent-being-detected)

_Sidebar: got a basic set up going on atm, but I wanted save my progress points as I go so I took a detour here and initialized a git repo before heading off into the next thing. Before doing so though, I added a .gitignore file so I don't send up unnecessary files up to github._

## serving up some html files

You can send html to browser in two ways using Express, dynamic or static files. Dynamic files are pages containing content generated server side (ex: node/ruby). Static files are content sent to server exactly the way it was inputted.

The way to serve an html file when root of site is visited is through [middleware](https://expressjs.com/en/resources/middleware.html).

_Middleware?_ "Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle." - [Express docs](https://expressjs.com/en/guide/using-middleware.html)

Note: by default express doesn't allow static files to be viewed unless static middleware function is injected into req/res life cycle.

How Express allows serving up of [static files](https://expressjs.com/en/starter/static-files.html):

```
// middleware
app.use(express.static(path.join(__dirname,'/public')));

```

_Presently, there is no public folder, but there will be._

`app.use()` tells Express to make use of what is within its parenthesis. In this case, it will be `index.html` file in the `public` folder. If user makes request outside this folder a 404 will be returned, app permits files within public folder to be viewed.

`mkdir public` in terminal and to create `index.html` file, `touch public/index.html`

Stuff that goes into HTML file: _I should really automate this..._

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>name me something awesome</title>
</head>
<body>
	<h1>snazzy title here :D</h1>
</body>
</html>

```

If you try and see this show up, it won't. Comment out the following:

```
app.get('/', (req,res) => {
	res.end('we now have a res');
})
```

Now refresh the page and you should see w.e dummy text you threw into your file to see if it works. If you were to disable the `app.use()` line from above, you'll end up getting the same error that was showing up at the start of this little journey, `Cannot GET /` because there is no indication of what files the user should be able to see.

Since this will be about getting a newsletter going... a form to opt-in is needed. So I added a `form` to the `index` file.

```
<form>
	<label for="email">email:</label>
	<input type="text" name="email" id="email" placeholder="dprince@gmail.com">
	<button type="submit" name="submit">submit</button>
</form>
```

Since I just went over [accessibility](https://rebelcl0ud.github.io/blog/accessibility/general/2018/07/06/51-accessibility.html) a few days ago I put in the `label for` for screen reader use.

## webpack & AJAX

Right now, adding an email into the form does nothing. We need to be able to add an email and it be sent to my `main.js` file for processing. When we first started this journey I tested out the basic set up with an `app.get()` and spit out/retrieve some basic text. A little rewind on that, except using `app.post()` since we'd like the user to send data/their email... that's done via POST request so that server is able to read/do something with that data. See: [Routing](https://expressjs.com/en/guide/routing.html)

```
app.post('/', (req,res) => {
	res.send('POST requested');
});

```

After adding this, refreshing the page and inputting an email... you can see the address in the browser change and email vanish from the input box. Something happened... and nothing happened at the same time. The message 'POST requested' I put in doesn't show up..._why?_ Well, the [form](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) needs something. It needs the `action` and `method` attributes. The `action` is where data should go and `method` says which HTTP method to use to send data.

`index.html`[revised]:

```
<form action="/" method="post">
	<label for="email">email:</label>
	<input type="text" name="email" id="email" placeholder="dprince@gmail.com">
	<button type="submit" name="submit">submit</button>
</form>

```

Now when you refresh the page and redo email input and submit, whatever message put should show up in-browser. The form works, but... when email is submitted our text that indicates success replaces the form. _Booo_ We want a seamless experience, where it doesn't get redirected-- process without the page reload.

In comes AJAX and for JS to be returned to user in optimal way...webpack usage. At this point I have used AJAX before client-side and I've set up webpack probably once or twice so this should be fun.

### webpack

hit up the terminal and run `npm install --save-dev webpack`, see: [webpack](https://www.npmjs.com/package/webpack)

`touch webpack.config.js` to create the config file that will allow webpack to run automatically.

In that file, add a basic setup.

```
module.exports = {
	entry: './src/index.js',
	output: {
		filename: './public/js/build.js'
	}
}
```

`entry` point is where app starts, in this case it will be done in a way for it to be inaccessible to outside users (so outside of public directory). _some of these folders/files don't exist yet, but they will_
`output` will be available to outside users (inside public directory).

Before we call webpack, create a script.js file, `mkdir src` for src folder and `touch src/index.js` for js file inside. Note: Without script file webpack will not be aware of what it is supposed to compile.

Now, webpack needs to compile while nodemon continues to watch for changes on backend files--

I added `"build": "webpack --progress --watch"` (<-- got it from a wes bos vid) to `package.json` file and ran `npm run build` and the following showed up in-terminal.

```
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
 - webpack-command (https://github.com/webpack-contrib/webpack-command)
   A lightweight, opinionated webpack CLI.
We will use "npm" to install the CLI via "npm install -D".
Which one do you like to install (webpack-cli/webpack-command):
```

Because I don't have much experience with webpack I figured going with the original, `webpack-cli`, would be a good place to start.

---

I got the following warning after running webpack, but since it doesn't seem urgent I'll get back to that-- _NOTE TO SELF: COME BACK TO THIS_

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

```

see: [mode config](https://webpack.js.org/concepts/mode/)

---

Ok, now I got `nodemon` running watching backend, `webpack` running and it generated/compiled output path/file I put in `webpack.config.js` file.

To test I added `<script type="text/javascript" src="./js/build.js"></script>` to `index.html` file and `console.log('it works!');` in `index.js` file.

Ok, realized that when webpack compiled it created a `dist` folder and inside it another `public` folder with `js/index.js`... not what I was expecting. I put in the file path in the `webpack.config.js` and was expecting it to compile in the already `public` folder. _hmm..._

Ok, deleted the generated files and did a redo. In the `webpack.config.js` I updated this

```
module.exports = {
	entry: './src/index.js',
	output: {
		filename: './public/js/build.js'
	}
}
```

to this

```
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './public/js/'),
		filename: 'build.js'
	}
}
```

see: [webpack-simple config](https://webpack.js.org/concepts/configuration/#simple-configuration)

When I relaunched `npm run build`, the files ended up where I initially wanted them. _w00t!_ and I got my 'it works' from `index.js` _whew_ NOW... I'm ready to go on and add some AJAX.

### ajax

Since I'll be using AJAX, I'll be incorporating jQuery. I hear you that although you can use AJAX with vanilla JS it tends to a pain in the @$$ so I'll stick to jQuery as I've done in the past.

`npm install jquery --save` see: [npm-jquery](https://www.npmjs.com/package/jquery)

add `var $ = require("jquery");` at the top of `index.js` to use jquery and to test that jquery is in fact available I added `console.log($('form'));`. Start up/restart webpack and check console, it should show form object.

now, to setup [AJAX](https://api.jquery.com/jQuery.ajax/), added the following to `index.js` file to test

```
$.ajax({
	url: '/',
	type: 'POST',
	data: {
		email:'dummyemail@whatever.com'
	},
	success: (response) => {
		console.log(response);
	}
});
```

refreshing the page, success would be for it to console.log the response which equals the console.log in `app.post()` inside `main.js` file.

```
app.post('/', (req,res) => {
	res.send('POST requested');
});
```

for some reason even after deleting my test console.log from `index.js` it would still console.log previous messages... which meant webpack was not watching for changes... so I revisted [webpack docs](https://webpack.js.org/configuration/watch/#src/components/Sidebar/Sidebar.jsx) for watch options. I updated my `package.json` and `webpack.config.js` as follows.

`webpack.config.js`:

```
const path = require('path');
module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './public/js/'),
		filename: 'build.js'
	},
	watch: true
}
```

^added `watch: true` to file.

`package.json`:
swapped out `"build": "webpack --progress --watch"` to `"build": "webpack"`

Now, changes to the message in `main.js` show up in the console.

_ok so everything seems to work as expected, connection-wise, but we need ajax implemented into form submission not page reload_

I added an id on the submit button in `index.html` and updated `index.js` to the following:

```
$('form').submit((event) => {
	event.preventDefault();
	$.ajax({
		url: '/',
		type: 'POST',
		data: {
			email:'dummyemail@whatever.com'
		},
		success: (response) => {
			console.log(response);
		}
	});
});
```

`event.preventDefault();` adding this prevents default reload of page after pressing submit button.

had an `.on('click',()=>{})` before, but changed it to a `.submit()` see: https://api.jquery.com/submit/ -- they seem to act the same way with the latter being a bit more straight forward, I suppose.

## body-parser

The goal: submit user email to server via post request, node server will then send data to mailchimp servers where mailchimp will process request and send a response back to node server that will then send a message back to user letting them know of whether it was a success or failure. At the moment, backend is responding, but not in the way we would like it to (yet).

There is a connection between browser and server, but it is using hardcoded data instead of data input through submission form that obviously has to be changed.

In `index.html` file I have `id="email"` on email input, but not on submit input so I added one.

In `index.js` file I added `var userEmail = $('#email').val();` to grab email input, which is snagged by using the `val()` method. See: https://api.jquery.com/val/

`index.js`:

```
$('form').submit((event) => {
	let userEmail = $('#email').val();
	console.log(userEmail);

	event.preventDefault();
	$.ajax({
		url: '/',
		type: 'POST',
		data: {
			email:'dummyemail@whatever.com'
		},
		success: (response) => {
			console.log(response);
		}
	});
});

```

it console.log(s) hardcoded userEmail, which can no be replaced with userEmail

```
$('form').submit((event) => {
	let userEmail = $('#email').val();

	event.preventDefault();
	$.ajax({
		url: '/',
		type: 'POST',
		data: {
			email: userEmail
		},
		success: (response) => {
			console.log(response);
		}
	});
});

```

now, w.e email you input should be the one that gets logged in console.

now to check with backend:

```
app.post('/', (req,res) => {
	console.log(req);
	res.send('POST request successful');
});

```

Note: console.log(ing) req will show up in terminal, not in browser console.

The output is a slew of things and when trying to use something like `req.body.email`, it doesn't know how to process it. In comes, middleware `body-parser` see:[commonly used 3rd-party middleware](https://expressjs.com/en/resources/middleware/body-parser.html), [body-parser GitHub](https://github.com/expressjs/body-parser#expressconnect-top-level-generic)

`npm install body-parser --save`

```
const bodyParser = require('body-parser');

// middleware
app.use(express.static(path.join(__dirname,'/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.post('/', (req,res) => {
	console.log(req.body.email)
	res.send('POST request successful');
});

```

At first it wasn't showing email in console... after server restart, all good.

Note: using 2 types of bodyParser middleware; one for classic encoding, like raw content of http post req/ default format used by HTML forms. Using AJAX, we use JSON to handle more complex data structure.

## mailchimp

I went ahead and created an account on [mailchimp](https://mailchimp.com/), there's a free tier. My only gripe, physical address needed. However, since this is just for the sake of getting more comfortable with Node I bit the bullet. Once all that was set up I went to the Extras dropdown and selected API Keys.

Press the `Create A Key` button and it will generate a key for you. This allows you to integrate your app with Mailchimp. Note: As with most API keys... keep it secret.

I created a list for testing purposes and added a test contact... one of mine I use for exactly these situations. Now, that I got all that... time to test out API hookage and all that jazz.

Now, I have implemented APIs in other projects, client-side. I've never used [Postman](https://www.getpostman.com/), but I've always wanted to use it soooooo today is the day.

SIDEBAR: my graphics card goes nuts sometimes... mongo was impossible to run on here so _fingers crossed_

Resources: [Mailchimp Docs](https://developer.mailchimp.com/documentation/mailchimp/guides/get-started-with-mailchimp-api-3/)

I grabbed the url under resources section and put it in Postman GET slot to pull email list and test out API/API key connection. `https://<dc>.api.mailchimp.com/3.0`

The `<dc>` part stands for data center. From docs, "The `<dc>` part of the URL corresponds to the data center for your account. For example, if the last part of your MailChimp API key is us6, all API endpoints for your account are available at https://us6.api.mailchimp.com/3.0/."

Following that section, there is a section to authenticate API. Copy/paste that somewhere, but replace the dc and api key with yours, and throw it in the terminal. It should spit out a whole bunch of stuff.

In Postman, you authenticate by going to the `auth` tab and choosing type of authentication from dropdown, `basic`. The username is `anystring` as it shows in the [authentication section](https://developer.mailchimp.com/documentation/mailchimp/guides/get-started-with-mailchimp-api-3/#http-methods) and password would be API key. Click `send` and the same thing you saw in your terminal (if you authenticated through there) will show up nice and pretty in Postman.

As I looked through data I saw lists which is what I would want to get so I'm thinking that will be my API endpoint. See: [endpoints](https://developer.mailchimp.com/documentation/mailchimp/reference/overview/) `/lists/{list_id}` looks like the winner here. _oops_ I mean, `/lists/{list_id}/members`

To get the list ID, go to list -> settings and click `list name and defaults` from dropdown.

Go back to Postman and where you have your base API url tack on `/lists/{list_id}/members` and replace `list_id` with id you snagged from the `list name and defaults` dropdown menu. Hit `send` and you should have your test email you put in as dummy subscriber for testing purposes.

The info comes using the GET request, but what we need is the POST request so that the email the user puts into the form gets pushed up to Mailchimp.

Going back to the [doc](https://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#%20), it turns out the POST and GET are similar with the exception of the required parameters in order for post request to work. In this case, it is `email_address` and `status`.

To test this out in Postman:
switch on over from `Auth` tab to `body` tab and select `raw` for JSON.

In the space below:

```
{
	"email_address": "dummyemail@whatever.com",
	"status": "subscribed"
}

```

and click `send`.

If you go back to your mailchimp list the email you put in Postman should be there. _woot_

_But like... let's hook it up to the form app already_

Ok, so apparently there is a `code` link in Postman, on the same line where the auth and body tabs are. Clicking that will take you to code snippets, use the dropdown for what's being used. In this case, Node -> Request.

_I see what the fuss is all about now regarding Postman and APIs_

Back in Node app, `main.js`:
create a function and post code snippet you snagged from postman and paste it in there.

In the code snippet, `request is required` didn't click that I would need to install it _oops_ so, `npm install request --save` see: [npm-request](https://www.npmjs.com/package/request)

Note: make sure when snagging snippet from Postman you choose JSON from dropdown beneath where you chose `raw` or app/form won't work.

Now, when you put in an email and submit the form, that email goes straight to be added into mailchimp list.

---

## adding an .env file

This totes should have been done sooner, but I was on a roll so I left off with not really commiting/pushing anything after the first few up to Github. So, I'm back to set up an `.env` file, see: [dotenv](https://www.npmjs.com/package/dotenv)

_you don't want to send off things like api keys into the interwebzzz_

## clearing my input box after form submit

throwing in `$('#email').val('')` within AJAX success callback did the trick.

## add some css

created a folder inside the public folder for my css and then created a file within that css folder.

adding `<link rel="stylesheet" type="text/css" href="css/style.css" />` to the `head` of `index.html` to hook up css.

[for fonts](https://fonts.google.com/)

## some things I thought would be good to add

done:

- added a `required` for email input, a red outline shows up-- if styling/ want it removed-- `input:required { box-shadow: none; }` removes it.

- combined nodemon & webpack into one terminal window, _having them seperate got annoying quick_

I came across a video where nodemon and webpack were ran from one terminal window so I went looking for what would help me do that. Hello, [concurrenly](https://github.com/kimmobrunfeldt/concurrently).

`npm install concurrenly --save-dev` to be added to my dev dependencies.

From there I updated `package.json` to:

```
"scripts": {
  "watch":"nodemon -L ./index.js --ignore public/",
  "assets": "webpack",
  "start": "concurrently 'npm run watch' 'npm run assets' --names '💻,📦' --prefix name"
},

```

- Heroku
  `heroku create APPNAME` & `git push heroku master` have worked previously, however I'm not sure if I've pushed a node app with a backend so...

_let's fix this shiii_

`heroku logs --tail`

my theory was I needed to state what file to use to get things running, maybe the way I had my "start" in my package.json was tripping things up... I added a Procfile with `web:node main.js`

but then... looking again through the logs...

    - `ERROR in Entry module not found: Error: Can't resolve './src/index.js' in '/app'` -- had a typo on my "watch" in my package.json, incorrect path.

and then...

    - `Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch` -- updated app.listen() from having specific port number only to having a env var as well, app heroku assigns dynamically and not having an env variable may be causing the port trip up.

See: https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script

pushed up to git/heroku annnnnd... it shows up _w00t_ Note: don't forget your config vars in Heroku.

## eslint

`eslint --init` creates config file, see: [ESLint docs](https://eslint.org/) for configuring.

## alerts

Already have the input box clearing itself upon successful AJAX call, but I wanted to add a bootstrap type alert without actually having to put in bootstrap.

I created a success-alert and error-alert message and set it up so it would show depending on the success/error of the AJAX call in my `index.js` file using jQuery's `.show().fadeOut()`. Of course, adding the styling of the messages in CSS file.

SN: Came across HTML validation attr so I went ahead and put one in there for email input.
