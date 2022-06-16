---
title: "Undoing Hard Reset, Git"
date: "2018-06-23"
---

After I pushed something up to Github and Heroku, I realized, I did not actually want to do that (_oops_).

_How to revert back to a previous state?_ I couldn't remember so I checked out my [Git It Done](https://rebelcl0ud.github.io/blog/git/2017/06/19/06-git-it-done.html) post and used the pretty cool `$ git reset --hard master@{"60 minutes ago"}` to revert back to a certain period of time. Which it did, but unfortunately went back too far so it affected not only the most recent, but the one before I wanted to keep (_face palm_). That was definitely a 'my bad' moment and a lesson learned... look at what you have pushed up minutes-wise before doing what I did.

_How to undo the reset?_ I came across `git reflog`. It shows you where you're at and where you were before you did whatever you did, in my case, the reset. `git reset 'HEAD@{1}'` was the fix suggested in [SO - Undoing Git Reset](https://stackoverflow.com/questions/2510276/undoing-git-reset#2531803) post.

I went ahead and went back to where I was and redid the initial reset, but with minutes matching the commit/push I wanted gone. I got it right and wanted to repush, but it wouldnt let me. The error was as follows:

```
! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git app here'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

```

That led me to using `git push origin HEAD --force` for Github and `git push -f heroku` for Heroku, which worked.
