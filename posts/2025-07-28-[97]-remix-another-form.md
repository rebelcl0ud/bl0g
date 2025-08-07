---
title: "remix - another form"
date: "2025-07-28"
---

# Another form?

Yes, yes. I actually already built register and login forms, the latter 😤 (got that sorted 😅) so of course I decided to build another form I've had on the todo list-- hello , addRecipe form.
At this point, I really have no idea if I've talked about why I started building this app, but basically there's a household in danger of being swallowed whole by a collection of recipes.
I thought it would be a good opportunity to use/learn Remix and touch some backend-ish stuff while working on something that would organize that recipe chaos.

## Details? What details?

So yea, when I build stuff I sketch stuff out (I like to "doodle", what can I say?) and it works alright... well, enough to get me out of my own way and start building something.
But then, of course, there comes a time that you build and look and then recall and ultimately realize/decide "s\*\*\*, that's not gonna work." and that's what happened to me while building this part lol
I realized that (with the db in mind + UX) I needed to put a little more thought into how exactly this form should go. Not just for my present self, but for my future self annnd my self that would want to use this dang thing.

### Trello?

These are the times I find myself going back and forth about whether I should have used something like Trello to write out the overall picture and then start drilling down into the details, but then I rememeber
although I dig organization I may go down a rabbit hole and essentially get so sucked into that I'd probably keep pushing the build start.
It's like researching (insert w.e here) at some point you gotta go try and do the thing!

## I'll be back

So, I have another backlog of docs to write (for my weekly LI posts-- trying to get into the habit of doing that) and haven't gone past much more than outline for each "post". Those are about authentication/etc.
This one would have started another "chunk", but since it's fresh and I'm about to put into practice what I decided on I figured I'd get this little "wip/draft" started.

## Ok, I'm back

Not going to lie, I forgot to come update this right away--
So, what happened? Well, at first I had, you know, a form lol but when it came to the ingredients/amounts of stuff _dun dun dun_ I realized... it had to be approached differently. So, I thought about it and was like, well, I'd like to see what I'm adding before I submit the form. I mean, sure, maybe there's a recipe out there with just one ingredient lolol but um, yea, no.

## Outcome

I moved out that piece of the form, ingredient/amount part, into its own component and used React state to give me that preview of what I wanted. Each time I added some ingredient/amount I'd get a little preview of what I added with the ability to remove it. There's a hidden input so when the form is submitted ingredient(s)/amount(s) go off with the rest of their little friends _weeeee_ through some checks and stuff until finally `createRecipe`.

There's still some things to add/tweak/etc, but still, yay for progress. I'll be adding tests and circling back to the test I stepped away from because (I think) while working on this I inadvertently shed some light on the issue. Girl, I love when that happens. I fight with myself about taking a breather, but more often than not lol the step back is the beginning to the answer unfolding. I'll be testing out my theory later... (future me) TODO: report back

## Did I fix that test file I walked away from for a bit?

Didn't circle back to that other test right away, but I finally got some real feedback from that login test file. Initially, I was receiving a Response type output-- turns out breaking out the form portion into its own component was the way to go. I still have to go back and flesh out that test file, but now I'm finally getting legit pass/fail outputs 🙌
