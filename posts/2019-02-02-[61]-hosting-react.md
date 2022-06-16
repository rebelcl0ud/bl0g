---
title: "Hosting React on Namecheap"
date: "2019-02-02"
---

First things first...
yes, you can host React on something like Netlify instead of Namecheap. Yes, they are simple/straightforward to setup up and yes they are awesome, but you know sometimes people just want to know how to do it on something like Namecheap!

# Hello Hosting

There are several hosting choices, some of which I've used myself on various different projects...

We got [Github Pages](https://pages.github.com/), [Heroku](https://heroku.com/), [Netlify](https://netlify.com/), [Surge](https://surge.sh)... which are pretty straightforward to set up and then we got places like Digital Ocean, Bluehost, Green Geeks, or (in this case) Namecheap.

Now, as I said before I've used some of the above mentioned, but I was always curious about hosting React on something like Namecheap. Hosting the usual HTML, CSS, and JavaScript/jQuery stuff was simple enough, but what about React where you have components and JSX (an HTML/CSS/JavaScript gumbo)?

## Let's serve up some React

When you use something like `create-react-app` it comes set up with being able to run `npm run build` -- your React awesome sauce gets converted to static awesome sauce; outputs a `build` folder. The contents of that folder go into the `public_html` folder of your hosting. You can throw it in there manually or use something like [FileZilla](https://filezilla-project.org/) where you connect to your hosting and able to drag drop your files from your local environment into your hosting server. Note: the info you need to connect FileZilla to your hosting comes in one of your welcome emails.

## Check your paths and jazz

A good way to check all is well before throwing it into the server is by opening your `index.html` file from within your `build` folder _in-browser_. Basically, you can navigate to the file and drag your index file into the address bar of the browser. Or, you can navigate from the top menu bar of the browser. If you have the paths set up ok it should show up and all should work as expected.

## Issues? Maybe it's...

I actually had an issue with this that was driving me crazy... make sure your `package.json` has something like `"homepage": "./"`. Once I got that fixed it showed up in my browser.

## All good?

At that point, transfer the contents of the `build` folder into hosting and all should be well in your world.

## Maybe not?

Now for those that, like me, were confused (maybe over complicated things because you've never done the whole Namecheap/React thing) at first and did all types of stuff and then threw it on Netlify (or similar) until you figured it out and then went to retry (but it still wasn't working eventhough you saw it show up in-browser) because dns settings got tweaked _inhales_

go to 'cPanel > Zone Editor' and click on 'manage', you should see a gear type icon to the right. Click on that. In that dropdown, click on 'reset zone'. Once I did that, it worked. Note: it may take a few min/hours for it to show up live.

## Last thoughts

Things like Heroku, Surge, and Netlify are fantastic, but knowing how to use an FTP client like FileZilla with a hosting service can be pretty amazeballs too. #justsaying

[React Docs - Deployment](https://facebook.github.io/create-react-app/docs/deployment)
