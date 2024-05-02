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

## editing a book
Upto this point there was no way to edit a book contribution so I started with adding a 'button' to do just that. On clicking, it would route the user to a page that would show a form populated with the information from the specific book user chose to edit. On that page, I grabbed the `id` from `Page params` to use with a `fetchBookByID` that would query for the specific book in the database. That information would then feed into the `EditForm` component prop that would give me the populated form I mentioned.

Issue encountered:
One issue I ran into, the action I had created for this form. I could not use it as-is like I did with the `createBook` action. Instead, I had to `.bind` the `updateBook` action giving it an initial value of null, and add the `id` as the 2nd argument. I went looking for what this actually does, essentially prepends `id` to the original arguments. Another bit I came across was that it ensures any values passed to the Server Action are encoded.

Second issue, I found as I was testing the editing was that the populated form was not populating with the most recent book info, after some searching I found I could use NextJS's `unstable_noStore` which happens to be the equivalent of `fetch(...., {cache: 'no-store'})`. After adding that to `fetchBookByID` I was able to see the expected book information within the edit form.

## deleting a book + adding tests
Last time I tried to add tests to a NextJS project I was beyond confused so here's to round 2!

Followed the Next docs and then writing my first test I realized I was getting some syntax errors... 
suggestion was `npm i --save-dev @types/jest` and then `ts-node`.

```
Error: Jest: Failed to parse the TypeScript config file /Users/jo/workspace/b00ked/jest.config.ts
Error: Jest: 'ts-node' is required for the TypeScript configuration files. Make sure it is installed
```

Finally! Success! Jest was setup.

Fun Fact: `npm fund`, I came across this during my setup and I'm not sure if this is something my past self encountered at some point and just forgot, but apparently this is how package authors let users know how they can finacially support their work. Running this, npm will then display things like links on where one can donate.

### running tests and refactoring
As I added and ran tests I came across a few fails and reasons why. One of these had to do with a form, which I refactored. 

Originally, I had the action:
```
action={async (formData) => {
  await createBook(formData);
  ref.current?.reset();
}}
```
The test led me to look at an alternative, which was to do the usual and pass a fn to an `onSubmit`. 
While troubleshooting I came across an exclamation, eg: `const formData = new FormData(ref.current!);`, the exclamation here is called the `non-null assertion operator`. This tells TS to treat the expression as non-null and ignore potential null or undefined value at that point. This is to be used with caution as it overrides TS's null checks.

## to be continued...
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
- [.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [passing additional args with .bind()](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments)
- [noStore](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#individual-fetch-requests)
- [jest](https://jestjs.io/docs/api)
- [testing library](https://testing-library.com/docs/react-testing-library/api)