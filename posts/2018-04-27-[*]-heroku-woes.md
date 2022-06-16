---
title: "Heroku Woes"
date: "2018-04-27"
---

During my quest on upping my JavaScript game I began updating projects to use ES6. I don't recall having an issue pushing other projects to heroku after updating, but for some reason this time I did.

Before the error happened, possibly coincidential, I was on a seperate branch and ran `git push origin master` after which I assumed nothing had actually happened since I pushed master and not the branch I was on. I merged in the branch anyway and when I tried to push from master I couldn't.

The error I was getting at the time had something to do with assets not compiling so I looked up the issue and found a few that mentioned `rake assets:precompile ` may work, it did.

However, I realized it was creating files and such in `public/assets` I didn't have in my project/repo before.

Again, on next push of edits I couldn't push normally, but this time the error was of that below.

```
rake aborted!
Uglifier::Error: Unexpected token: operator (>). To use ES6 syntax, harmony mode must be enabled with Uglifier.new(:harmony => true).

```

Solution: change `config.assets.js_compressor = :uglifier` to `config.assets.js_compressor = Uglifier.new(harmony: true)` in `production.rb` file in `config/environments/`

[Ruby Doc - Uglifier](http://www.rubydoc.info/gems/uglifier)

Before I came to that solution, I believe, I ran `rake assets:clean` or `rake assets:clobber` (Rails 4+) to remove the files that had shown up from the inital error/solution of `rake assets:precompile`.
