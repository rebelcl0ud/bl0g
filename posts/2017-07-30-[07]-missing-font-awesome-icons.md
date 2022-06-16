---
title: "Missing: Font-Awesome Icons"
date: "2017-07-30"
---

I've had this issue twice. Thankfully I wrote it down the first time it happened and figured since it happened a second time I should post it for future reference.

At first I went through the whole generating a link thing (which I've done on previous projects) and used it in the `<head>` section and all seemed well. This time however they stopped showing up.

I looked it up and found some people were saying that there was a bug causing them to not show up on certain browsers. The workaround suggested was to put the following in the `<head>` section
`<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">` which worked on all icons except one.

So, off I went for another/better solution which ended up being the `font-awesome-sass` [gem](https://github.com/FortAwesome/font-awesome-sass).

TL;DR
Check out `font-awesome-sass` [gem](https://github.com/FortAwesome/font-awesome-sass) and follow the doc :)
