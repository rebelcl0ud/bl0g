---
title: "Updating Past Projects 1"
date: "2018-01-22"
---

I've had a a todo list of sorts regarding past projects. My main focus was on functionality so styling was always something I wanted to revisit.

I haven't decided on whether I will combine all edits on this post or give each project it's individual post, but for now I'll start with listing my first update.

## Quote Machine

I pulled up my project and headed to my `master.css.scss` file and pretty much scrapped the whole thing.

I'd like to point out before doing this I created a new branch as to not disturb what I originally had. I've gotten into a habit of creating branches when adding a feature or for experimenting _that way_ I can just scrap it, keep adding to it over a few days, whatever, without messing with the whole thing.

`git branch nameOfBranchHere` => creates the branch

`git checkout nameOfBranchHere` => switches to it

For more info: [Git Branch Basics](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

My previous documentation is posted on here titled "quote machine [doc]" nothing of styling was documented on there and with good reason as I just threw on a background image from [Unsplash](https://unsplash.com/), a [google font](https://fonts.google.com/) and some basic color on the buttons. Most definitely, nothing fancy. But, as I said, my attention was on functionality.

I started with [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) for layout. This was something I implented on this updated version.

Then, put a creme-like color background and placed quotes on a "quote card". I added a border that somewhat matched the background color and made the color of the quote card itself an off-white color.

The font was changed from font initially used. It's actually a font similar to my handwriting, all in caps. I also spaced out the letters a bit because I noticed on longer quotes it came across as just too much text.

The original buttons for cycling through quotes and tweet button were both scrapped and, at first, [Bootstrap](https://getbootstrap.com/) came to mind, but I wanted to try something different so I threw in buttons from [Materialize](http://materializecss.com/buttons.html). I love the color. Then, added [font awesome](http://fontawesome.io/) quote and twitter icons to the buttons.

Below is my present css file:

```
@-ms-viewport{
  width: device-width;
}

@media (max-width: 800px) {
 .quote-box {
  grid-area: 2 / 1 / 3 / 4;
 }

 .waves-effect {
  margin-bottom: 15px;
 }
}

@media (min-width: 801px) {
  .quote-box {
  grid-area: 2 / 2 / 3 / 3;
 }
}

body {
  background-color: #FFF2E5;
}

.wrapper {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: repeat(3, 1fr);
  height: 100vh;
}

.quote-box {
  margin: 50px;
  padding: 25px;
  border: 15px double #FFDFBF;
  font-family: 'Rock Salt', cursive;
  /* 16 * 0.0625 = 1px */
  letter-spacing: 0.0625em * 5;
}

.share-buttons {
  grid-area: 3 / 2 / 4 / 3;
  justify-self: center;
}

.waves-effect {
   box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}

#new-quote {
  margin-right: 100px;
}

.boom-box {
  background-color: #fdf9f3;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
```

Almost forgot, I added some shadow to the "quote card" and a more subtle version of it on the quote and tweet button. Then, went back to update tweet quote function to reflect the increase in characters allowed.

[check out 2.0 here](https://quotemachine-jo.herokuapp.com/) :)
