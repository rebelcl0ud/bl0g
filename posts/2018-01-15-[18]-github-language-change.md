---
title: "Changing Prominent Language On Github"
date: "2018-01-15"
---

`*.rb linguist-language=Javascript` in `.gitattributes` will do a language override on Github. [Note: adjust code to your particular proj]

Why do I know this? Or, better yet _why would I want to know this?_

Well, using Rails for its [ENV]variable to store API keys [example: weather app] made it look as if the project was mainly Ruby eventhough (technically) it wasn't. I wanted the focus on Javascript since that was the reason for the project. So, I figured someone had to have run into this same issue for whatever reason and found the articles below.

Resources:

[Github Changes Repo to Wrong Language](https://stackoverflow.com/questions/34713765/github-changes-repository-to-wrong-language?noredirect=1&lq=1)

[How To Change Repo Language](https://medium.com/black-tech-diva/how-to-change-repo-language-in-github-c3e07819c5bb)

[Linguist Overrides](https://github.com/github/linguist#overrides)

---

Sidebar:

When it came to API keys I didn't want to make mine public. Atleast not for the DarkSky API I used for my weatherapp. I went looking to see how other FCC campers went about it and it seemed either they used some mockup link (sometimes FCC would have those) or for those that wanted to use real world APIs, I noticed some would have their keys on display on Codepen/etc (eek).

Although I'd like to think I'm just as much a n00b as any of them I did have a slight advantage (at least on this matter). Learning to code, I started with Rails and had done a couple of projects building contact forms with email functionality so I knew it was possible to hide keys using Figaro.

I did look into other ways though-- Node came up a few times during my search, but I decided to go with what I was familiar with (Rails).

I think this is when I officially decided that it would be a good idea to learn Node (and friends :D). Although, I'm interested in frontend I'd like to understand and be able to work backend of a JS fullstack app if I needed/wanted to.
