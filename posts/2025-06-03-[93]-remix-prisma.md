---
title: "Remix - Prisma"
date: "2025-06-03"
---

Continuing to curate noted encounters into posts– Prisma.

Prisma has nice documentation, it was pretty quick and straightforward. Well written docs are such a beautiful thing to experience, truly.

I may have interacted with Prisma before, if I did I wasn’t the one that set it up. So… 🎶these were a few of my prisma-y things…🎶

This error: `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`

What happened? Seems Prisma client import was being evaluated too early. Vite’s SSR mode triggers full module tree evaluation, so Prisma was trying to initialize during build instead of runtime.

The fix? Moved Prisma logic so the instance only happens when the app runs, not during SSR. Basically, this defers Prisma until runtime and avoids breakage.

Also, by marking ‘@prisma/client’ as an external in the ‘vite.config’, Vite knows not to bundle or try to process during SSR. Instead, it’s required at runtime. This prevents Vite misinterpreting Prisma client’s (non-ESM friendly) internals, which can crash the SSR build.

Lastly, I set an explicit output path in the schema to future-proof setup. Prisma 7+ will stop generating into ‘node_modules’ by default, so I wanted to make sure things wouldn’t implode if/when upgrading (even left my future self a note on there🙂).

Speaking of schema… setting up model relationships wasn’t too bad, considering I don’t remember the last time I did this.😅

Slight oops: In the original setup, I couldn’t reuse ingredients across multiple recipes. It would instead create ‘duplicates’, new rows in the ‘Ingredient’ table even when the name/amount were the same.

The fix? Created ‘Ingredient’ and ‘RecipeIngredient’ (a join table), and updated the ‘Recipe’ model to reflect that relationship.

At this point, I deleted the random nonsense dummy data I had and created a seed file that made more sense. Now that I’m thinking about this… _goes to check schema to see if I forgot something_ …nope, I’m good.

Also, I forgot to run both ‘prisma migrate dev’ and ‘prisma generate’ so for a solid minute I thought I broke all the things. Had to double check the queries as well, b-e-c-a-u-s-e, turns out I forgot to include an ‘include’ (ha, see what I did there?)

Still got a few posts to edit, but once those are donezo tests are next. ✨🖖

#latenightswithjo🌙 - _the hashtag means it was posted on LinkedIn_
