---
title: "performance - ssr"
date: "2024-02-08"
---

Nobody wants to serve a 💩 site, therefore having something lean and fast as possible is something we should all have in mind. With that said, we want to make sure we are loading what needs to be seen so that as the rest is coming in it is happening while the user is getting aquainted with the site and making a decison on what to do next.

_server-side rendering as entered the chat_

What is server side rendering (ssr)?
Basically, you run React on Node before the request is served to the user and first rendering of website is sent down.

Having full interaction capapbilities may be the same or slower, but as for first sight... that should def be faster.

To get this rolling, anything that interacts with the DOM cannot be loaded in Node or it will break, so anyhing browsery (ie: analytics, etc) gets migrate over into another file. And that file is now swapped in to `index.html`.

- [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)

Next step is getting a file going that will run through, in this case, vite so then Node can do the thing and render the app.

Once Vite transpiles, Node will run it creating readable React markup for the user.

- [renderToPipeableStream](https://react.dev/reference/react-dom/server/renderToPipeableStream)

- [StaticRouter](https://reactrouter.com/en/main/router-components/static-router)

I've been mentioning _[node](https://nodejs.org/en)_ around, what's node without mentioning [express](https://expressjs.com/). That's gotta come along for the ride too so `npm i` that sucker.

Once that goes down, take a gander at that `package.json` and set up your `build` script(s), as well as, make sure you state `module` as `type`. In the intermediate React course I was working through this is what it looked like.

inside `scripts`:
```
build:client": "vite build --outDir ../dist/client",
"build:server": "vite build --outDir ../dist/server --ssr ServerApp.jsx",
"build": "npm run build:client && npm run build:server",
```

outside `scripts`:
`"type": "module",`

So, what was the purpose of all that? Well, one, the `type` is to say well, _the type_ :D as in modules are being used and not commonJS which I believe is the `require` thing vs `import`... but I'd have to double check that. The other, build, _builds_ the app into assets that node can run.

lastly, the node server. 
- [express]((https://expressjs.com/))
- [fs](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
- [path](https://nodejs.org/api/path.html#path)
    - [.dirname](https://nodejs.org/api/path.
    html#pathdirnamepath)
    - [.resolve](https://nodejs.org/api/path.html#pathresolvepaths)
- [fileURLToPath](https://nodejs.org/api/path.html#pathresolvepaths)
- and the file that was generated with `build:server`.
    - [onShellReady](https://react.dev/reference/react-dom/server/renderToPipeableStream#rendering-a-react-tree-as-html-to-a-nodejs-stream)
    - [onError](https://react.dev/reference/react-dom/server/renderToPipeableStream#logging-crashes-on-the-server)
    - [onAllReady](https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation)

In the end, this was giving nextjs vibes _lol_