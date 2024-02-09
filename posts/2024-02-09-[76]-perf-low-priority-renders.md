---
title: "performance - low priority re-rendering"
date: "2024-02-09"
---

In a scenario where an app has alot of different information, like feed of some sort, and you decide to interact with a side panel of other information, if the feed was in progress of a render it could cause things to slow down because now 2 things are happening... 1. the side panel you just clicked and 2. the feed.

In cases like this, what would be good idea is to have that feed stop and focus on what you want, the side panel.

_useDeferredValue has entered the chat_

The idea behind this is that not all renders are or need to be high priority and therefore can be interrupted, what we never want especially as a user is to have what we want interupted. Which means, that side panel mentioned above, we want **that** and it needs to feel responsive as everything else pauses what they were doing (because _low-priority_).

- [docs - useDeferredValue](https://react.dev/reference/react/useDeferredValue)

- [docs - useMemo](https://react.dev/reference/react/useMemo)

With `useMemo` we have `deferredValue` as cache, updating as `deferredValue` updates... which it will because the `useDeferredValue` hook is just _deferring_ updating part of the UI, but as it updates in the background with the new value that will trigger the change within `useMemo`.

So, if you have some performance issues due to parts of your app re-rendering and causing issues with other areas and it is possible to prioritize, this is the hook for you!

Another hook worth mentioning, `useTransition`. This one is 🛎 **ding ding** for _transitions_. :D

For example, a state that may not need to be high priority can be deferred and show a loading state until everything else is done all to keep things responsive.

So, how do you know when to use which?

- `useTransition` is more about React having this new thing, but it's low priority. (proactive)

- `useDeferredValue` is more about _when_ React gets this new thing, it's low priority so get it done at your leisure. (reactive)

- [docs - useTransition](https://react.dev/reference/react/useTransition)