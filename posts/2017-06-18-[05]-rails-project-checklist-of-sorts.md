---
title: "Rails Project Checklist of Sorts"
date: "2017-06-18"
---

The following was typed up a bit back during one of my projects--  
I did clean it up some, because my initial "jot down" was as I went and well, good thing it wasn't on paper.  
Disclaimer: This could probably use more of an edit, but until then...

# SETTING UP PROJECT

_Where will my project live?_  
`$ cd /vagrant/src`

ex:  
if opening up fresh terminal window (as in my local machine):  
`$ cd ~/Desktop/vagrant`  
and RUN vagrant

START:  
`vagrant up`

STOP:  
`vagrant halt`

Create a new project/app that uses postpres  
`$ rails new SITENAME --database=postgresql`

NOTE:  
If you run this and it tells you rails is not installed or something along those lines-- _is vagrant up? are you in the correct terminal within environment?_

NOTE:  
Make sure vagrant is running/ run vagrant, open vagrant terminal window and try again.

- Did you see a nice wave of files being generated? \*  
  your proj should have been created at this point

Open project in text editor (ex: Sublime)

Open database.yml

```
  username: postgres
  password: password
  host: localhost
```

NOTE:  
above would be for development, test, and production  
be careful-- double check database adapter-- should say postgresql  
file is whitespace sensitive^^

I add above info in database file under default--  
if you look at the file under dev, test, and prod you can tell they are inheriting from the default section-- instead of typing it out 3x I just input it 1x

# RETURN TO TERMINAL WINDOW

Make sure you are in the project directory

CREATE intial database  
 `$ rake db:create:all`

START SERVER

1. Open a 2nd terminal window if you havent done so already
2. Make sure it is terminal window from within environment as you did with how you created your project above
3. Go to project directory

`$ rails s OR $ rails s -b 0.0.0.0`

Check localhost web page -- you should be greeted with a welcome aboard page ex: http://localhost:3030/

ERROR:  
Checking terminal, error saying could not create DB
Upon rechecking I noticed I left username/pw under production
NOTE: all 3 should match with info from above

# SETTING UP WEB DEV PIPELINE

SETUP GIT

`$ git init .`  
 `$ git add --all`  
 `$ git commit -am "initial commit"`

SETUP GITHUB

GO to [Github](https://github.com)

- NEW REPO button

- NAME it, leave PUBLIC button  
  NOTE: DO NOT check initialize readme (default will get generated ready to be edited with specific project info)

- CREATE REPO button

AFTER page reloads
"Push existing repo from command line..."

NOTE:  
SSH will use pw already setup, https will require username/pw each push

COPY/PASTE:  
`git remote add...` AND THEN, `git push...` IN TERMINAL

NOTE: Each command will populate info specific to github acct

HEROKU

`gem 'rails_12factor', group: :production`  
NOTE: above goes in gem file

UPDATE: above gem is not needed with Rails 5 :)

`$ bundle install`

NOTE:  
Installing the above gem

- production efficiency, speeds up project load times
- allows for errors in heroku logs, useful for troubleshooting rather than generic messages

UPDATE production config file  
`config/env/production.rb`

CHANGE line

```
"Do not fallback to assets pipeline if precompile asset is missed"
config.assets.compile = false
```

into =>

```
"DO fallback to assets pipeline if precompile asset is missed"
config.assets.compile = true
```

NOTE: remember to back up/ push up code to github with any major changes

# DEPLOY to HEROKU

`$ heroku create APP NAME`  
 `$ git push heroku master`

NOTE: URL by "launching..." is heroku url
BUT, if you visit site at this time--  
you'll be greeted with "the page you were looking for doesn't exist" --

_why?_

because... page hasn't been built yet :)

BASIC SETUP COMPLETE :)

Grab your wireframe or go create one and get jammin'
