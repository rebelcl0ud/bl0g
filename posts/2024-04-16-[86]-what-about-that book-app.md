---
title: "what about that book app idea? (doc in progress)"
date: "2024-04-16"
---

I randomly started a toy project using React, TypeScript and Jest a couple of years ago just to kinda practice using TypeScript outside of work. The plan was to elaborate on it, but I ended up never pushing it up to Github and thought I lost it. Ended up finding it not too long ago and it made me think about continuing with the addition of using NextJS.

## here we go
First place I started was NextJS docs for initial setup. 

Some things I installed soon after:
- https://github.com/lukeed/clsx
- https://github.com/tailwindlabs/heroicons
- https://hipsum.co/

## basic UI
I removed the boilerplate stuff that came along with the nextJS install, updated, but kept it simple. I added a basic initial route where I would want a list of books to be displayed. On that same page, I added an input to be able to add a book to that list (no functionality yet, just UI with dummy data). Also, added a sidenav to elaborate on later, again just to flesh out the UI. Presently, it's not the prettiest, but good enough to get to the point which is working with a database. This isn't an area of expertise for me and it is something I really would like to have a better grasp on.

## the database quest
In looking through the NextJS docs I saw there was a way to get a database going through Vercel so I decided to start there. But before that, I created a file that would essentially feed my dummy data into the database, a file to fetch this data, and a file to give structure to that data. 

With those ready to go, I went back to the NextJS docs and after the vercel hookup I headed back to the dashboard > storage tab to create one. **NOTE: if you have a free hobby plan you will only be able to have ONE.**

I followed the prompts, snagged the _secrets_ from the `.env.local` tab and put them in my project (`.env` file). **Note: make sure you add this file to your .`gitignore`**

Finally, `npm i @vercel/postgres` to install the Vercel Postgres SDK.

### seed the database
Here I started with making a file of **dummy data** of what I thought I would want or need. Since the app will be book related, an id, title, author and notes made sense as object properties. So I started off with something like:
```
const books = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    title: "some title here",
    author: "some name here",
    notes: "something here",
  },
];

```

I followed with a seed file that would create tables and insert the dummy data into those tables. This file included SQL. I had noticed this possibility while looking through NextJS docs and found this quite strange, I don't think I'd ever seen this done before and was wondering about it being secure, specifically SQL injections.

SQL injections, THOU SHALL NOT PASS? `@vercel/postgres SDK` extracts params into an array, array gets sent with query string to the server where the params get sanatized and inserted into the query where **only then** it is finally executed. Until that point of execution the query cannot be executed.

Ok, so I got the files to get the data in the database, but *how do I get this actually in there?* I ended up adding `"seed": "node -r dotenv/config ./src/scripts/seed.js"` into my `package.json` and ran it.

Note: `dotenv` is used, it's a module that loads environment variables from a `.env` ([dotenv](https://www.npmjs.com/package/dotenv))

Some issue that came up:
- `SyntaxError: Cannot use import statement outside a module`-- oops, adding `  "type": "module",` to the `package.json` solved that.

- In regards to the `id`, I had started with a simple `id:"123"` but it gave me an issue when starting up the app because it wasn't matching the format I was including in my sql commands, specifically `uuid-ossp`. This is an extension for PostgreSQL that provides functions and operators to generate universally unique IDs. The following `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` installs and allows you to start using its generated functions within SQL queries. When creating my table, for example, `id UUID DEFAULT uuid_generate_v4() PRIMARY KEY`.

Notice there's a `v4` in there. I was curious about this and looked it up. I found this: `uuid_generate_v4(): Generates a version 4 UUID using random numbers.`. Two others came up on the quick search and depending on version it can include certain things, for example, v1 would generate based on timestamp and MAC address.

### pulling data from the database
OKAY! So, we got the dummy data in there and now _I want it_ so I can list that dummy data on the page. I went ahead an created another file and added a function to fetch it. That function was then exported to my component where I used that data to map into my `<Book/>` component.

_runs local_ annnnd... we got some dummy data loaded on the screen, success.

## inserting a book - forms, Zod, revalidatePath(), useRef()
Some things to now look into:
At the moment, it is a typical form that takes a book title, author and some notes. There isn't much styling as my main focus is functionality. I started by making a file for my action, `createBook`. This function will extract the data (`formData`) into an object where I'll use `.get()` method and test it out. I'm sure uneccessary to alot of folks, but I tend to `console.log` each bit as I go.

Next, validating the data and preparing it before you send it off to the database. I want to make sure I have it in the correct format and correct types. To handle this, it is possible to do it manually, but I came across a library to simplify the task, Zod.

One thing, I forgot to mention was due to the nature of the actions file `use server` was added to the top. _What is that?_ In NextJS by adding this I'm marking all exported functions within the file as server functions which can then be imported into client or server components. Note: it is possible to also write server actions inside a server copmponent by adding `use server` inside the action.

Next, inserting the data into the database. Here, I used the postgres sdk and the `revalidatePath` from `next/cache`. What does that do? it purges cached data on demand for a specified path. In other words, once the database has been updated with info submitted, the `/books` path will be revalidated and fresh data will be fetched.

Next, the form input values don't clear after being submitted. To clear this we can use a hook, `useRef`. We can access the form element using this hook which will return the form object that contains the `reset()` method. Hooks can only be used in client components, putting `use client`at the top of the Form componet file will mark it as one.

## next steps, to be continued...
This will continue to get filled as I work through the project.






References:
- [nextJS](https://nextjs.org/docs/getting-started/installation)
- [clsx](https://github.com/lukeed/clsx)
- [heroicons](https://github.com/tailwindlabs/heroicons)
- [hipsum](https://hipsum.co/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [preventing sql injections](https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [Zod](https://zod.dev/)
- [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [useRef](https://react.dev/reference/react/useRef)