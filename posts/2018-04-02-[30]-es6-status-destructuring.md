---
title: "ES6 Status - Destructuring"
date: "2018-04-02"
---

### destructuring objects

Can extract data from arrays, objects, maps and sets.

This I actually found pretty cool. There have been a few instances I have broken down things into multiple parts, writing extra... until...

```
let quote = item.saying;
let author = item.author;

```

vs.

```
let { saying:quote, author } = item;

```

How awesome is that?^ AND the `saying:quote` part is me storing `saying` into `quote` variable! Yes, I dig it and am stoked to use it.

Destructuring would also come in handy for deep nested data, like with an API. Thinking back, I'm pretty sure the Dark Sky API I used for my weather app had a few of those.

```
const you = {
  first: 'NAME HERE'
    links: {
      social: {
        twitter: 'https://twitter.com/USERNAME',
	github: 'https://github.com/USERNAME'
    }
  }
}

const { twitter, github } = you.links.social;

```

SETTING DEFAULTS:

`const settings = { width: 500, color: 'black' }`

`const { width=100 height=500, color='pink', fontSize=32 } = settings;`

2nd line above has defaults set, in other words as it deconstructs settings obj it checks if there's a match. If so, it moves on and if not, it takes the default.

BREAKDOWN: width is included in the 1st line (settings) so it stays at 500, height takes 500 which is set as default in 2nd line (destructuring line), there is color in settings so it stays black, but fontSize, like height is not so it takes default set, 32

### destructuring arrays

Just like objects, there's a way to simplify life with arrays. The difference, object destructuring uses curly braces, while arrays used square brackets.

```
const details = ['scrappy', '14', 'brindle'];

const name = details[0];
const age = details[1];
const age = details[2];


```

vs.

```
const details = ['scrappy', '14', 'brindle'];

const [name, age, color] = details;

console.log(name, age, color); // scrappy 14 brindle

```

Note: There will also be a difference when destructuring maps and sets, maps uses curly braces, while sets use square brackets.

Also helpful when dealing with a [comma] list/string:

```
const data = 'sport, basketball, shaq, 32, retired';

const[category, type, player, number, status] = data.split(',');

console.log(category, type, player, number, status);

```

^At first, I had used a `let` instead of `const` to split data and reassign variable, but turns out there is a simplier/ better way to do that and that's just add it to the destructure (w00t!)

```
const data = 'sport, basketball, shaq, 32, retired, yourFace';

const[category, type, player, number, status] = data.split(',');

console.log(category, type, player, number, status);

```

^What happens when you want to destructure something that doesnt match length of array? Nothing.
Output will actually remain the same since the last part of the string was not destructured.

But, how about those times you do want the rest?

```
const cockpit = ['Clarence', 'Roger', 'Striker', 'Doctor', 'Nun'];

const [pilot, co-pilot, ...passengers] = cockpit;

```

^ you'd destructure as usual, but use the _rest operator_ to snag the _rest_ :D

### swapping variables with destructuring

When you need to toggle between variables:

```
let onCourt = 'DWade';
let offCourt = 'UD';

console.log(onCourt, offCourt); // will show org

[onCourt, offCourt] = [offCourt, onCourt];

console.log(onCourt, offCourt); // will show swap

```

^ Will create an array and destructure into opp variables. Since updating variables -> using `let`

### destructuring functions - multi returns + named defaults

Multi- Returns:

```
function convertCurrency(amount) {
  const converted = {
    USD: amount * 0.76,
    MEX: amount * 13.30,
    GPB: amount * 0.53
  }
  return converted;
}

const hundo = convertCurrency(100);
console.log(hundo);

console.log(hundo.MEX); // to return specific value

```

Destructuring to return multi values from a function is a cheat since you can't _really_, but u _can_ return an obj with a restructured answer.

```
function convertCurrency(amount) {
  const converted = {
    USD: amount * 0.76,
    MEX: amount * 13.30,
    GPB: amount * 0.53
  }
  return converted;
}

const {  MEX, USD, GPB } = convertCurrency(100);

console.log(USD, MEX, GPB);

```

^Desctructuring in this manner, able to snag specific value. The order that is is destructured doesn't affect value return since it is an object.

Note: It isnt necessary to destructure all if, let's say, only USD and GPB is needed.

Named Defaults:

```
function tipCalc({total, tip=0.15, tax=0.13}) {
  return total + (tip * total) + (tax * total);
}

const bill = tipCalc({ total: 200, tax: 0.09 });
console.log(bill);

```

Making order of values independent, you wrap params in curly braces. Pass obj will destructure into 3 variables (total, tip, tax)/make available inside function. When called, you pass obj with values, they do not have to be in exact order and it is possible to leave unneeded values out.

If NO arguments are passed:

```
function tipCalc({total=200, tip=0.25, tax=0.09} = {}) {
  return total + (tip * total) + (tax * total);
}

const bill = tipCalc();
console.log(bill);

```

For cases where no obj are passed to destructure against, calling function, you have to give itself a default argument. If no object is passed it will default to blank obj and all defaults will be in there.
