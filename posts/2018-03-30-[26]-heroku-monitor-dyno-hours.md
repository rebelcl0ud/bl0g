---
title: "Heroku: Monitor Dyno Hours"
date: "2018-03-30"
---

How to check dyno [hours] usage:

- Sign into your Heroku account
- Go to Account Settings
- Go to Billing tab
- Scroll down to section containing list of apps and their hour usage

Determine free dyno hours using Heroku CLI:

Run `heroku ps` on free app, `heroku ps -a <app name>`

Or, for overall account usage `heroku user:info`

[Heroku article regarding free dyno hours](https://devcenter.heroku.com/articles/free-dyno-hours)
