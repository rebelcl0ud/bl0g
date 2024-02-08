---
title: "performance - code splitting"
date: "2024-02-08"
---

React is ~40KB as-is, doesn't sound too bad, but when it comes to initial page load it may be, especially adding third-party libraries into the mix as you go along.

Wondering how big something is?

Check out [Bundlephobia](https://bundlephobia.com/package/react-dom@18.2.0). I was introduced to this some time ago by a senior developer on one of my first projects. Anytime we wanted to introduce something, we could check there to see how much it was going to add to the project and if it was worth it.

Maybe performance won't be noticeable on high-speeds, but can we reallly be sure anyone trying to access the app will have that... I guess depending on the project/intended audience we may have some idea. For someone that finds themselves with 2G speed... initial page loads can be _slooow_.

So what are some things we can do?

_Code-splitting has entered the chat._

This allows spots to be identified as splittable, then vite can do its thing to split and load later.

Basically, anything you are not using upfront can be a good candidate for this. However, **this isn't something to go ham on**. There should be some performance metrics/etc being monitered with a bottom line of 'hey, do we really need to cut down load here, how much (should be significant), and will this actually give better user experience?'.

- [Suspense](https://react.dev/reference/react/Suspense)
- [lazy](https://react.dev/reference/react/lazy)
