---
title: "Heroku Stack Upgrade"
date: "2018-06-23"
---

Was sent an email to upgrade my Heroku stack to Heroku-16 from Cedars-14(deprecated), `heroku apps:info` shows you what stack you're on. In [Heroku Article - Upgrading to Latest Stack](https://devcenter.heroku.com/articles/upgrading-to-the-latest-stack) there are different sections from testing app on new stack to straight upgrade with even a section to rollback just in case it all blows up in your face.

I went ahead and upgraded.

`heroku stack:set heroku-16 -a <app name>` will set you up, but will not take effect until you push your app to Heroku.

I thought of no changes to make at the moment, but was pleasantly surprised you can create an empty commit so you can push right away. Seriously, I found this to be awesome which is why I'm writing this, a note to self if you will.

`git commit --allow-empty -m "upgrade to heroku-16"` followed by, of course, `git push heroku master`

At this point app should be running on latest stack, but of course check on it and make sure all is working as it was before the upgrade.
