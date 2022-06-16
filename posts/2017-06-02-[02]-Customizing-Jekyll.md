---
title: "Customizing Jekyll"
date: "2017-06-02"
---

I know there are gems/ themes up for snag on the Internet which probably would have been way quicker, but all I wanted was some minor tweaks. I managed to make a few changes, but when I restarted the server... everything reverted. O_O <-- me

_What happened?_

Do NOT mess with files in `_site`.

Jekyll only shows you a handful of things. The rest is hiding inside the gem. Naturally, I want in and if you're like me check out [Overriding theme defaults](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) section and for general structure [Directory structure](https://jekyllrb.com/docs/structure/).

Pretty much the way to customize is to have your own file of whatever you want customized, a copy to tweak which will get sucked through all that `_site` goodness and finally spit out your beautiful edits.

Personally, I couldn't locate my theme's directory even after unhiding files, but I am a newb so it's totally possible I missed something.

Since I made a mess the first time I created a new project, left `_site` alone and copied folders/files I wanted to edit (ie:
\_layouts, \_includes, \_sass, assets)

Adjust css file in assets folder. Personalize title and info in config file... _You get it._

To be fair, I should have looked up how to customize first before messing with things, but where's the fun in that?

Additional resources:

1. How to unhide files [post](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/)
2. Jekyll basics by Travis from [DevTips](https://www.youtube.com/user/DevTipsForDesigners), on Codecourse YouTube [video](https://www.youtube.com/watch?v=iWowJBRMtpc)
