---
title: "Whoops - I committed a file I shouldn’t have"
date: "2025-06-25"
---

Whoops. I realized I committed a file I shouldn’t have. Although I’m not working on anything that will destroy lives, still, I wanted it gone.

First stop, `.gitignore`. All good? On to git "time travel".

If you're working with others, communicate the issue and discuss next steps. Don't ‘YOLO’ decisions/actions that may affect others without a ‘heads up’. If riding solo, I'm all for ‘let’s see if this blows up in my face’. Either way, it's going to be a learning experience. 🚀

I used `git-filter-repo`.

There were a few things I had to adjust to get going, `pipx` vs `pip install` (PC/WSL), update the PATH for `pipx` inside `.zshrc` so `git-filter-repo` would be accessible from the terminal, and (obvi) a backup.

Note: if doing typical folder copy make sure the comp stays awake, otherwise it can leave the process interrupted and in an odd state. Ask me how I know?😅

So, what did I use? `rsync`- used inside WSL, shows progress and skips already copied files on retry. 🙌

The moment of truth: `git filter-repo --path [file to be removed] --invert-paths --force`
Warning: This rewrites everything and their mother (commits, branches, tags)

Outcome: `origin` remote was removed (expected) and confirmed the file was no longer in history, although still present locally.

All seemed well, so off I went to push the changes. Unfortunately, I hit a snag– broken pipes, something-something, and disconnects. Womp. womp. 🫠

[GPT] Suggestions:

-   Temporarily increase Git buffer size and set compression? The former stalled and the latter, I don’t remember, but I imagine unsuccessful as well. 🤷‍♀️
-   Create a `mirror` clone? This, I didn’t fully understand as it was presenting it as a bare/minimal option, but from my understanding a `mirror` would include all the things because, well, it’s a mirror. Nonetheless, I tried it out (more out of curiosity than anything else) and don’t think it worked. (checks notes) No, it did not. 🙃

I went back to the initial repo, post-`git-filter-repo`, and revisited SSH options. Specifically,`git config --global core.sshCommand "ssh -o Compression=no -o IPQoS=throughput"`

What does this do?
-o Compression=no: Disables SSH compression, which sometimes causes issues when pushing large objects.
-o IPQoS=throughput: Changes Quality-of-Service for network packets to prioritize bandwidth over low latency, which is more stable for large Git pushes.

This should help prevent broken pipes, disconnects, and remote hang ups.

Note: this is _global_ so it’s a good idea to revert this back to defaults –
`git config --global --unset core.sshCommand`

Lastly, `GIT_TRACE_PACKET=1 GIT_TRACE=1 GIT_CURL_VERBOSE=1 git push origin main --force`

What does this do?
This gives debug info while using the custom SSH config.

…verdict?

Y’all, finally, success.

Woo, I thought I was gonna have to split this one into 2 parts 🙈-- writing is rewriting!

If you actually read this one, congratulations (lol) & thanks! ✨🖖

#latenightswithjo🌙 - _the hashtag means it was posted on LinkedIn_
