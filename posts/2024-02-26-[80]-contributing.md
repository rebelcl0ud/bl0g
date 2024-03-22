---
title: "contributing"
date: "2024-02-26"
---

One of my first contributions to a project (that wasn't some team of people I had met prior) was FCC (FreeCodeCamp) with a couple of random ones for my first Hacktober. I've been wanting to contribute again and after doing a React refresher (checking out what's new/etc, things I didn't get to encounter/use at work) I figured why not contribute to that. So, I made some notes as I went along at what I could 'fix' and today when I sat down to get started I realized I had left my notes behind (lol), but more importantly I wasn't sure how I did it last time... _did I fork it? What did I do first?_

Turns out, yes, that is exactly first stop... fork it.

- fork it

- clone it (your fork) -- if you've ever worked with a team this step should be familiar territory as the steps that follow.

- create a folder on your machine on where it will go and run the `git clone` cmd
    - you may see that your fork is behind some commits, if so, `git pull` from original repo.
        - example: `git pull <https://github.com/somebody/whatever-project-name.git main`
        - you can then update your fork with `git push`

- create a branch, give it some form of description
    - `git checkout -b whatever-you-decide-to-name-your-branch-goes-here`
        - this creates the branch (`-b` is shorthand for branch) and puts you on it due to `checkout`

- make your changes; add, commit, push
    - `git push` may not be enough, you may get a message similar to `git push --set-upstream origin your-branch-name`
        - _what does this mean?_ It means you will establish a connection between local branch and branch on the remote repository (in this case, the forked repository on GitHub)

- create a PR (pull request)
    - 👀 there should be a green button for you to press _somewhere_

- describe what your PR is about (what changes it entails)
  - let people know purpose, changes made, etc. It is possible there may be a template to follow on the project/repo, if not, try to be as descriptive as possible.
    
    Below is what I submitted recently. Honestly, I was having trouble deciding what/how much to include. The last time I did one of these I was on a project where there was a template to include information wanted/expected.

    
    PR Title:
    
    `addresses minor issues in the lessons/documentation`
    
    PR Body:
    ```
    Purpose:
    PR addresses minor issues in the lessons/documentation: typos, grammar, and occasional syntax or version issue. The goal is to improve overall clarity and readability of course lessons.

    Changes Made:
    - Corrected typos/spelling.
    - Fixed grammatical errors to improve readability/clarity.
    - Adjusted syntax (redux-lesson 14) on one example, due to reassignment, eg: const >> let.
    - Added note to module installation (c8-testing-lesson 15) about possibly encountering an error where (for the sake of following along the lesson) the original version used would likely be necessary.
    ```
   
- once done, submit away
    - it's ok, don't be scared :D

Now you wait on feedback...

- keep an eye out for any questions/concerns/etc about your changes and be prepared to appease/explain/etc

- changes approved? your PR will be merged in. Take a moment, do a happy dance or whatever your vibe is and repeat the process either on the same project or another one you may have found in the wild.

Something I came across _after?_... _during?_... _while?_ (I don't remember now :D) submitting my PR - this [how to contribute](https://opensource.guide/how-to-contribute/) guide!