---
title: "Jekyll Serve Woes"
date: "2018-01-12"
---

I have a list of drafts waiting for me. I don't post often which means I tend to forget about `jekyll serve` and friends.

`/' not found` came up (with a few variations) as I tried to get my site to load.

Turns out what I needed was `jekyll serve --baseurl '/blog'` instead of plain 'ol `jekyll serve` Note: Before I would append `--host` and all that in there, but adding it to the `config` file saved me some typing.

And `http://localhost:3030/blog/` instead of `localhost:3030` in browser.

Personally, I do not remember having to do that before, but now if I ever forget again here it is!

Resource:
[Jekyll Troubleshooting](https://jekyllrb.com/docs/troubleshooting/#base-url-problems)
