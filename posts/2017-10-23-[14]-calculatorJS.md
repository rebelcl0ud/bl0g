---
title: "calculatorJS"
date: "2017-10-23"
---

This project was initially setup in rails... _the thing is_ I started learning with rails and once I shifted into learning Javascript I kept setting it up mainly for practice (didn't want to completely forget things) and to make use of `ENV[variables]` when it came to keys and such.

When it came to creating the Javascript Calculator however-- it really wasn't necessary, not even a little bit. But, out of habit, that's how I set it up.

I had every intention of going back once I was done and migrate only the necessary files from the original repo into a clean repo/project. _Which I did_ hence this post :).

# calculatorJS

created simple project with only files necessary [eg: html, css, js]

The gist:

- created project folder
- inside that folder there's an `images` folder, `styles` folder, and `script` folder
- index file with html stands alone in projects folder
- css goes in `styles` folder
- javascript goes in `scripts` folder
- my background image went in `images` folder
- deployed site using surge.sh (had always wanted to try it out, this was my first time)

my edits:

`index.html.erb` => took out erb

- not needed as erb is to have ruby within html

`master.css.scss` => took out scss

- not needed as I didn't have any sass in that file, it was done more out of habit from doing rails proj

`main.js` => created/moved into its own folder, out of `index.html` file

additional edits:

- had to add jquery link [below] for jquery to work
- css had diff ext when in rails proj

```
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="styles/master.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
  </script>
  <title>calculatorJS</title>
</head>
```

- had to add script tag for js as well and placed at bottom of html file to allow html to load first

```
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="styles/master.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
  </script>
  <title>calculatorJS</title>
</head>
<body>
  <div class="container">
  <div class="main">
    <div class="black-top"></div>
      <div class="display">
        <br /><br />
        <span class="model">CASIO pocket-8S</span><br />
        <span class="title"><small>ELECTRONIC CALCULATOR</small></span>
        <br /><br /><br />
        <span class="results">0</span>
        <br /><br />
        <span class="mem"><small>0</small></span>
      </div> <!-- end of display -->
      <div id="buttons">
        <button id="solar" value=''>o |||</button>
        <button id="ac" value=''>AC</button>
        <button id="c" value=''>C</button>
        <button id="percent" value=''>%</button><br />
        <button id="seven" value='7'>7</button>
        <button id="eight" value='8'>8</button>
        <button id="nine" value='9'>9</button>
        <button id="divide" value='/'>/</button><br />
        <button id="four" value='4'>4</button>
        <button id="five" value='5'>5</button>
        <button id="six" value='6'>6</button>
        <button id="multiply"value='*'>x</button><br />
        <button id="one" value='1'>1</button>
        <button id="two" value='2'>2</button>
        <button id="three" value='3'>3</button>
        <button id="sub" value='-'>-</button><br />
        <button id="zero" value='0'>0</button>
        <button id="deci" value='.'>.</button>
        <button id="equals" value=''>=</button>
        <button id="add" value='+'>+</button>
      </div> <!-- end of buttons -->
      <div class="black-bottom"></div>
    </div> <!-- end of main -->
  </div><!-- end of container -->
</body>
</html>

<script src="scripts/main.js"></script>
```

another edit `master.css` was for background image to show in browser

- the url needed to be `url(../images/wood.png);`
- the `no-repeat` had to be taken out from next to url, which worked within rails env, but not as standalone-- it had to be placed in its own line `background-repeat:`

```
body {
  background-image: url(../images/wood.png);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat center center fixed;
}
```
