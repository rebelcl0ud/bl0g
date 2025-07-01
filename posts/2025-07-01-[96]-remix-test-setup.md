---
title: "Remix - Setup Tests"
date: "2025-07-01"
---

Setting up tests 🙃

Before going any further I stopped to set up tests- foundational test files to add onto as I continue building out things. I used Vitest and Testing Library and, although not used, I came across `vitest-browser-react` which apparently was inspired by Testing Library - TIL (just in case: shorthand for Today I Learned).

If you gasped and clutched your chest whispering, "no TDD?"- that is correct. The reality is I got carried away wanting to get something going, I have nothing against TDD. Tests in general are a must- tests not only direct you, but can correct you. Also, I don’t think this is said enough, they can be super valuable as documentation.

So what did my tests direct or correct?

-   Testing a Remix Route Component I realized I didn’t add a conditional to prevent rendering code that assumed presence of data.

-   Testing for no recipe, I got a refresher on `getByText` vs `queryByText`-- I randomly confuse these sometimes. `getByText` throws if the element is not found, while `queryByText` returns `null` if not found– good for asserting absence.

-   Testing the loader, I mocked the db layer– I think (of all testing) mocking still is a bit weird for me, but it definitely isn’t anxiety inducing like when first encountered. 😅

-   Response assertion: `toMatchObject()` vs `toBeInstanceOf()` + `toHaveProperty()`-- the former compares plain objects, while the latter ensures you’re throwing a `Response` and checks properties reliably.

In summary, tests are cool. Do all the tests, but be intentional. 🚥

#latenightswithjo🌙 - _the hashtag means it was posted on LinkedIn_
