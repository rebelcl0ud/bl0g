---
title: "terminal, vim, ohmyzsh"
date: "2023-09-18"
---

## terminal stuffsss
I always find it so fascinating when I see people really go at it with their terminal, remembering all these commands and such...

I've come to remember a few over time (due to repeated use), but nothing close to what I've seen from others.

Some of the ones I tend to remember:
* ls => lists what's in the directory
* cd => changes directory, ie: cd ~ (home dir), or cd .. (which moves up on directory)
* mkdir => make directory
* rm => remove file
* touch => creates file, ie: touch file123.txt
* ctrl + c => exits
* clear or cmd + k => clears terminal

Then there's some I, maybe, saw at some point and forgot or just plain didn't know:
* echo => repeats input
* rmdir => removes directory, directory needs to be empty
* man => gives you info on command, ie: man ssh
* cat => shows all file contents
* less => shows file contents by page
* ls -la => lists directory contents + those hidden
* pwd => prints working directory
* chown => changes owner
* / some-char-here, ie: /-l => finds keyword within vim file
* chmod => change mode (changes to permissions)

## vim stuffsss
Something I remember giving me anxiety when I first encountered it was vim... and by this I mean when I was staring at what clearly was a file but in the terminal and I needed to either edit or like leave and didn't know how (obvi the internet or kind soul came to the rescue)
* vi => i believe this one opens a file, ie: vi someFile
* i => insert mode (you'll be able to edit in this mode)
* esc => get out of edit mode so you can save/exit
* :wq => this saves your edits and quits/exits out
* :q => this one just quits/exits (no saving here)
* :q! => if you get stuck (lol)

## shell stuffsss
Since this is all about terminals, how about shells... there's `zsh` and `bash`. Wanna see your current shell?
* `echo $0` or...
* `echo $SHELL`

Your shell config may be a place where you edit/add themes, ie: [https://ohmyz.sh](https://ohmyz.sh) or for getting your nvm path all sorted.
