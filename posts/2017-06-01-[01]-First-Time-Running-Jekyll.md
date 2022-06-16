---
title: "First Time Running Jekyll"
date: "2017-06-01"
---

I first heard about Jekyll some time last year while first learning web development. I knew I wanted to try it out, but wasn't sure what I wanted to use it for. So, I ended up saving the tab onto my browser favorites for my future self.

Future self (now present self)-- put a portfolio together and thought it would be a good place to link a blog-- using Jekyll. I figured it the perfect opportunity to get a blog going as I migrate my notes from Sublime AND learn Jekyll in the process.

Now that I got Jekyll running this post covers some things that came up:

_Where's Jekyll?_

I setup [Jekyll](https://jekyllrb.com/docs/quickstart/) following the quickstart doc, but when it was time to fire it up... no localhost page >\_<

In my case, I have vagrant running and to get my rails server going I run `rails s -b 0.0.0.0`. My first thought, I would need to type something similar, but unsuccessful. _Spoiler: I was missing a serve command option._

I hit up [DuckDuckGo](https://duckduckgo.com/)...

_Sidebar: if you aren't using that adorable duck instead of Google... why? Check it out, I linked it._

Okay so back to my search-

---

I came across this StackOverflow [post](https://stackoverflow.com/questions/41619011/how-to-run-jekyll-on-a-virtual-box-server):

To access the jekyll instance in the virtual box server, run Jekyll with the server IP.

```
Usage:

jekyll serve [options]

Options:

-H, --host [HOST]  Host to bind to
```

Supposing the virtual server IP is `192.168.1.100` then run the following command in the server to make the jekyll instance accesible from outside:

`jekyll serve -H 192.168.1.100`

Then it will be accessible at http://192.168.1.100:4000

---

I was close with `jekyll serve --host 0.0.0.0`, but I hadn't considered my vagrant environment setup which forwards port 3000 to 3030. That's what I was missing. I needed to specify the port as well because not doing so was giving me Jekyll's default `http://0.0.0.0:4000/` instead of `http://0.0.0.0:3000/` which would then allow `http://localhost:3030` to show up (which is what I wanted).

TL;DR

Running vagrant with port forwarding-- I needed `jekyll serve --host 0.0.0.0 --port 3000` in order for my Jekyll site to show up on `http://localhost:3030`

Note: You can also put `port: 3000` in the config file instead of in the terminal and it will load that way as well.

Additional sources:

1. Regarding vagrant setup & Jekyll: Firehose Project YouTube [video](https://www.youtube.com/watch?v=XoqQQe8Qq1k)
2. Jekyll docs options and flags [page](https://jekyllrb.com/docs/configuration/)
