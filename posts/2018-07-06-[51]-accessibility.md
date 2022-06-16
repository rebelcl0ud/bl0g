---
title: "Accessibility"
date: "2018-07-06"
---

[FCC](https://www.freecodecamp.org/) has leveled up on topics, accessibility being one of them. It's something that I've been interested in for some time so I jumped on it and made this post after finishing the section. Looking forward to putting it all to use and having "notes" to come back to.

Some points to keep in mind regarding accessibility: [WCAG](https://www.w3.org/TR/WCAG20/)

I. Add text alternative to images for the visually impaired.

- screen readers can access alternative text to convey info.
- helps in case image doesn't load or can't be seen by user.
- used by search engines to catalog for search results.

ex: `<img src="yourlogo.jpg" alt="startup logo">`

It is meant to be a short and sweet despecriptive text of the images you've included on site. Although, alternative text (alt) is considered mandatory at this point (see: HTML5 specs) there are times when it is best left blank.

Times to leave it blank (meant to minimize redundancy):

- if image is only for decorative purpose, like a background image.
- image was already described elsewhere, as with group caption.

ex: `<img src="yourbackgroundimage.jpg" alt="">`

Note: I tend to use CSS to add any background images, screen readers don't process that markup.

II. Headings show hierachy

- use h1-h6 tags correctly, have semantic meaning.
- headings >= rank imply new section.
- headings < rank imply subsections.
- there should only be one h1, main subject.
- h1-h6 tags should not be used for their size, change font-size in css.\*

Screen readers can be set to read certain things like just titles to get the gist of an article or site as a whole. So, using heading tags correctly is important for structure/ semantic meaning.

_semantic meaning_: tags used indicate type of content/information.

III. Jumping straight to content using certain elements

- <main>
- <header>
- <footer>
- <nav>
- <article>
- <section>

HTML5 brought new elements that help with accessibilty. Although, rendered like a `<div>` they provide semantic meaning. Like, the tag name can be an indication of information while giving additional information (ex: page summaries) to users using assistive technologies.

`<main>`: there should only one, it bookends the _main_ content. It has an embedded feature where it gives assistive technology the ability to jump to/navigate to main content.

_If you ever see a link on a page saying "jump to main content", that's using the embedded feature mentioned up there^_

Note: things like navigation that are repeated throughout pages should not be included.

`<article>`: it creates sections of standalone/independent content (ex: blog posts)

`<section>`: groups related content (ex: chapters)

`<div>`: groups content, no relation btwn groups

IV. Making navigation easier for the screen readers

- <header>
- <nav>
- <footer>

All share embedded feature found in `<main>` tags giving screen readers ability to jump straight to section.

`<header>`: used to wrap intro content/ nav links/ things repeated in multiple pages. Note: `<header>` is not to be confused with `<head>` tags where you have page title, have meta info, etc., etc. Unlike `<head>` tag, the `<header>` tag is included within `<body>`

`<nav>`: used to wrap main navigation links of page. Note: if using navigation on both top and bottom of page, `<nav>` is not used on both (unneccessary, `<footer>` will do)

`<footer>`: mainly used for copywright info or site related links

V. Audio elements to help with audio content accessibility

- <audio>

Note: Audio content needs alternative text for those deaf or heard of hearing. This can be done using a transcript link or nearby text.

ex: `<audio src="sourceFileHere.mp3" type="audio/mpeg" controls></audio>`

The use of the `controls` attribute shows browser default audio controls like play/pause and keyboard functionality support.

Note: audio clip will probably sound like it's on fast-forward, but not for a screen reader user.

VI. Visual charts and such

- <figure>
- <figcaption>

Another HTML5 introduction, these two used together wrap things like charts, bar graphs, diagrams, etc. They not only group similar visuals, but provide text `<figcaption>` explaining what is included in `<figure>`

ex:

```
<figure>
  [Some visual element goes here]
  <figcaption> Here goes caption, brief note of figure. </figcaption>
</figure>
```

VII. Label elements on form fields

`label` tag wraps text like name/choice on a form.
`for` attribute on a `label` tag associates the two on a form and is used by screen readers.

ex:

```
<form>
  <label for="username">username:</label>
  <input type="text" id="username" name="username">
</form>
```

Note: the value used with `for` attribute must match `id` attribute value.

VIII. Wrapping radio elements on form fields

- `fieldset`
- `legend`

Even when each choice is given a `label` and `for` attribute, the use of radio elements can be grouped together to show they are a set. Using `fieldset` and `legend` can show this in a semantic way.

`fieldset` groups
`legend` describes elements in group

Note: these are not necessary if choices are self-explanatory like with gender/ethnicity selection. In that case, `label` and `for` would suffice.

ex:

```
<form>
  <label for="username">username:</label>
  <input type="text" id="username" name="username">

  <fieldset>
    <legend> Choose your item: </legend>
    <input type="radio" id="one" name="items" value="one">
    <label for="one">Item One</label>
    <br/>
    <input type="radio" id="two" name="items" value="two">
    <label for="one">Item Two</label>
    <br/>
    <input type="radio" id="three" name="items" value="three">
    <label for="one">Item Three</label>
  </fieldset>
</form>
```

IX. Date Picker & Standarized Time

`input` fields on form create different form controls, `type` attribute declares what kind (ex: text, radio, submit)

HTML5 introduced the option for date input. Depending on browser the `type` can either default to text (which is why it is a good idea to show date format in a label/placeholder) or date picker will show up in `input` field when in focus.

ex:

```
<label for="dateInput">Enter Date:</label>
<input type="date" id="dateInput" name="dateInput">

```

HTML5 also introduced `time` with `datetime` attribute to set time standard. `datetime` attribute holds valid format accessed by assistive devices, preventing confusion when writing may be informal on site.

ex: `Donations will go out on <time datetime="2018-04-13">Friday the 13th</time>`

X. Making elements only visible to screen readers

Once you got a logical html setup using tags correctly/semantically the next step is to use CSS to further help with accessibility to things like a chart or bar graph.

Using CSS you are able to position off-screen an alternative to those visual representations for screen readers.

ex:

```
.offscreen-sr {
  position: absolute
  left: -10000px;
  width: 1px;
  height: 1px;
  top: auto;
  overflow: hidden;
}
```

Note: the above is different than using `display: none;` or `visibility: hidden;`, those will hide elements for everyone. Same with having 0 values on `width` or `height`, 0 removes from document flow prompting screen readers to ignore it.

XI. Readability with high contrast text

WCAG (Web Content Accessibility Guidelines) recommends 4.5:1(at minimum) contrast ratio on normal text.

Ratio comes from calculating the relative luminance values of 2 colors.

- 1:1 for same color/ no contrast
- 21:1 for white/black strongest contrast

[contrast checker](https://webaim.org/resources/contrastchecker/)

XII. Avoid colorblind issues w/ sufficient contrast

In general, color should not be used solely to convey important information, screen readers won't see it, but contrast also helps for colorblind users.

Colorblind endusers have issues telling certain colors apart, in regards to hues or lightness. Reminder: contrast ratio calculated by luminance, lightness of foreground/background colors.

Good way to fix this: darken darker colors, lighten lighter colors using a color [contrast checker](https://webaim.org/resources/contrastchecker/).

ex: darker colors tend to be blues/reds, lighter colors tend to be greens.

XIII. Give links meaning

Screen readers have options on what to focus on whether that be jumping to main content, skimming headings, or links only (use descriptive text).

ex: Click here for`<a href="">full article on photons</a>`

The above example bookends a brief description of what the link would lead to, in comparison to having it bookending 'Click here' which doesn't say much about the link or where it goes.

XIV. HTML Access Keys - keyboard-only users

`accesskey` attribute activates shortcut key to bring focus to elements on the page. It can be used on anything, but can be more useful on interactive elements like links and buttons.

ex: `<a href="" accesskey="p">What are photons?</a>`

The above example allows keyboard-only users to press 'p' to bring focus on article about photons.

XX. HTML Tab Index - keyboard-only users

`tabindex` attribute when used indicates element used on can be focused on. The value used with it determines behavior (ex: positive, negative, zero integers). Note: using this attribute enables CSS `:focus` on element used.

Elements like links get keyboard focus by default, but using `tabindex` on a `div`, `span`, and the like will give that same functionality to those elements. ex: `tabindex="0"`

Using `tabindex="-1"`, perhaps on a pop-up window shows that it has focus ability, but not reachable by keyboard.

When using `tabindex="1"`, 1 or higher, you are able to give order to what element go on focus first before default elements using `tabindex="0"`

Note: using this tab order will override HTML source/ default order of page possibly leading to confusion of the end-user that may expect to start at the top of the page. In other words, be mindful.
