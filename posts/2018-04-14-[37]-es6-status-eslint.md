---
title: "ES6 Status - ESLint"
date: "2018-04-15"
---

Docs: [ESLint](https://eslint.org/)

So, to use this I need to check for `node -v` and `npm -v`-- make sure they are current and all that jazz.

`npm install -g eslint` to install ESLint globally.

Check version with `eslint --version`

### line and file specific settings

ESLint gives the ability to disable things on a file basis or even just a few lines within the a particular file.

Example: disables for full file

```
/* eslint-disable no-extend-native*/

code begins

```

Example: disables part of a file

```
whatever code here

/* eslint-disable */
code giving error, but I want to ignore it.
/* eslint-enable */

whatever code resumes
```

### plugins

`"plugins": ["html", "markdown"]` is something that can be added to `.eslintrc` file. I haven't checked myself yet, but it may not be possible to use `--fix` on any errors that come up. `--fix` works JS-only files.

A little something I was wondering about and actually spent quite a bit of time on was looking for a way to parse `.erb` files. I actually have some JS with ENV variables in Rails and it seems I can use `eslint . --ext js.erb` in the command line, but nothing within the config file itself.

### eslint inside text editor

[sublimelinter.com](http://www.sublimelinter.com/en/stable/)

Install:

    - Go to Sublime Text > Preferences > Package Control

    - Package Control: Install Package (dropdown menu)

    - Sublime Linter (dropdown menu)

Then, repeat for SublimeLinter-eslint

If all went well, you should have gotten a message that says it has been installed/upgraded and to restart Sublime.

If nothing happened, it is possible you may have it or you gotta get package control squared away. I had to look into it, I believe to put in jade a few months back-- [Package Control](https://packagecontrol.io/)

You can check for packages: - Go to Sublime Text > Preferences > Package Control

    - Package Control: List Packages (dropdown menu)

NOTE: gotta have ESLint globally installed, these plugins use your system-- you can double check with `eslint --version`

`cmd + shift + p` brings up the dropdown where you can adj settings.

NOTE: I was getting `ERROR: eslint cannot locate 'eslint'`, the fix: run `which eslint` in the command line/terminal, the path it shoots out is the path you want to include in your Sublime ESLint Settings. Should look something like this:

```
"paths": {
  "osx": [
    "/Users/jO/.nvm/versions/node/v9.11.1/bin"
  ],
},

```

References:

[https://github.com/SublimeLinter/SublimeLinter-eslint/issues/42](https://github.com/SublimeLinter/SublimeLinter-eslint/issues/42)

[https://github.com/SublimeLinter/SublimeLinter-eslint](https://github.com/SublimeLinter/SublimeLinter-eslint)

Reminder: the `.eslinrc` file may have to be written a certain way-- in my case, I'm in rails so I had to edit my file to look like this...

```
env:
  browser: true
  es6: true
  jquery: true
extends: 'eslint:recommended'

```

instead of something like this...

```
{
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true
  },
  "extends": "eslint:recommended"
}

```

### my wtf moment trying to incorporate ESLint into 2nd project

So everything (my ESLint in Sublime) was working until... well, it wasn't.

Behold! `ERROR: env: node: No such file or directory` -- off I went to duck duck go.

The following seemed the most helpful/useful, maybe:

- [https://github.com/SublimeLinter/SublimeLinter/issues/1218](https://github.com/SublimeLinter/SublimeLinter/issues/1218)

- [https://github.com/SublimeLinter/SublimeLinter/pull/1266](https://github.com/SublimeLinter/SublimeLinter/pull/1266)

- [https://github.com/SublimeLinter/SublimeLinter/issues/725](https://github.com/SublimeLinter/SublimeLinter/issues/725)

There were a few suggestions, but a simple solution (to me) seemed to set up a connection between the command line and Sublime. A user mentioned that was a way of avoiding that error so I figured it was worth the shot because I would not only gain convenience, but ALSO get this thing to work.

Off I went. _imagine lute type tunes playing at this very moment_

### opening sublime from command line

Resource: [https://olivierlacan.com/posts/launch-sublime-text-3-from-the-command-line/](https://olivierlacan.com/posts/launch-sublime-text-3-from-the-command-line/)

`echo $PATH` and `ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime`

The path is pretty straight forward, _but what is `ln` and `-s`?_ I asked myself this very Q and because I will forget, I'm making a note of it for my future self below.

- `ln` is link/symbolic link of an exisiting file [ln](<https://en.wikipedia.org/wiki/Ln_(Unix)>)
- `-s` print the allocated size of each file, in blocks. [-s](https://www.computerhope.com/unix/uls.htm)

My `ERROR: env: node: No such file or directory` error seems to have vanished, seems all is well.

_checks sublime console_ Or... not. Hmmmmm...

Welcome, `- Unexpected top-level property "browser".` error.

I thought perhaps editing my `eslintrc` file from this:

```
env:
  browser: true,
  es6: true,
  jquery: true
extends: 'eslint:recommended'

```

to this:

```
extends: 'eslint:recommended'
env:
  browser: true
  es6: true
  jquery: true

```

But, that wouldn't make much sense since in another project I had a file that looked the exact same way and it had worked just fine so maybe...

Maybe I need the symbolic link from within my vagrant command line?

`failed to create symbolic link` - from what I read it seems this cant be done this way, security risk type jazz.

Ok, so maybe...

I hit up my duck duck go and started my search once more. I mean, I haven't used ESLint much so maybe I missed something that I had done in the previous project where I first set up ESLint & Sublime.

Hello, `eslint --init`

I decided to scrap the `eslintrc` file I had and ran `eslint --init` some Qs pop up to get your config file started (which can be edited after the fact) annnnnndddd _drum roll_ I finally got my little dots!

My `eslintrc` file atm:

```
env:
  browser: true
  es6: true
  jquery: true
extends: 'eslint:recommended'
rules:
  indent:
    - error
    - 2
  linebreak-style:
    - error
    - unix
  quotes:
    - error
    - single
  semi:
    - error
    - always
  no-unused-vars: 1

```

Sidebar: I've discovered the lute calms the aggro of hours troubleshooting :D

### thou shall not pass [into git repo] _unless_ ESLint allows it

I remember using Rubocop which is pretty much ESLint, but for Ruby code. Like ESLint it catches any errors in code which is great especially when on a team and you want everyone's code looking uniform and tidy. I was using Travis, for the first time, and remember it would tell you if your build passed or failed depending. If it failed, your push wasn't going anywhere.

Apparently, there's a `.git/` folder with a `hooks` subfolder that does something similar. You can put certain code to run before certain things happen and it doesnt allow you to move forward (ex: commit) until those errors are resolved. _ya learn something new every day_

_where's the .git folder_?

Well, since there's a `.` that precedes it, if you don't see it, it's probably hidden. I'm sure there's a few ways to hide and unhide stuff, but the one I've used a few times has been running the following in the command line [press enter after each line]:

```
defaults write com.apple.finder AppleShowAllFiles TRUE

killall Finder

```

To revert: repeat, but switch out 'TRUE' for 'FALSE'

For similar stuff, including the one I've used, check out [HowToGeek Article](https://www.howtogeek.com/211496/how-to-hide-files-and-view-hidden-files-on-mac-os-x/)
