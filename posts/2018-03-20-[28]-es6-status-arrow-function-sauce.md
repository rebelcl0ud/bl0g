---
title: "ES6 Status - Arrow Function Sauce"
date: "2018-03-20"
---

## arrow functions

concise, impicit returns (allowing one-liners), doesn't rebind value of `this` when using arrow function within other function.

`const kids = ['bandit', 'flavor', 'scrappy'];`

original, non-arrow function:

```
const withLastInitial = kids.map(function(kid) {
  return `${kid} P`;
});

console.log(withLastInitial);
```

using arrow function:

```
const withLastInitial2 = kids.map((kid) => {
  return `${kid} P`;
});

console.log(withLastInitial2);
```

when only passing 1 parameter (same as above):

```
const withLastInitial2 = kids.map((kid) => {
  return `${kid} P`;
});

console.log(withLastInitial2);
```

or... you can remove parenthesis, they aren't needed:
sidebar: imo, I think it looks odd and I rather have the parenthesis like above, seems nicer/readable

```
const withLastInitial3 = kids.map(kid => {
  return `${kid} P`;
});

console.log(withLastInitial3);
```

implicit return:
meaning `return` isn't stated (explicitly), in the case below it is assumed

```
const withLastInitial4 = kids.map(kid => `${kid} P`);

console.log(withLastInitial4);
```

if no there were to be no arguments:

```
const withLastInitial5 = kids.map(()=> `whut whut`);

console.log(withLastInitial5);
```

NOTE: all arrow functions are anonymous functions, not named

ex: `function() { ... }` vs `function nameGoesHere() { ... }`

Using named functions can benefit you when troubleshooting an error. Personally, I like to name my functions for readability, kinda like a title of an article, it gives a headsup of what to expect/ what is it supposed to be doing/ what is it for/ etc.,

It is possible to put the function in a variable:

```
const nameGoesHere = (param) => { alert(`hey ${param}!`)}

nameGoesHere('you'); // alert box will pop up saying 'hey you!'

```

function declaration, still anon function, still wont be very useful for stack traces (something to keep in mind)

### more on arrow functions

#### implicit return w/ obj literal

```
const soda = 'coke';
const whatKind = ['zero', 'diet', 'cherry', 'original'];

// {
//  whatKind: whatKind,
//  soda: soda
// }

const pop = whatKind.map((whatKind, i) => ({name: whatKind, soda: soda, order: i}))
```

NOTE: without the outer parenthesis you will get a syntax error^
Why? The removal of the curly brackets would do an implicit return, however to do an implicit return on an object literal, not actual function block you need to enclose it with a pair of parenthesis-- it shows you are returning an object literal

ANOTHER NOTE: and a pretty sweet one... use `console.table(pop)` will spit out info in a pretty table. Much nicer than using Object dropdowns in console

`const pop = whatKind.map((whatKind, i) => ({name: whatKind, soda, order: i}))`
the use of `variableName: propertyName` is not necessary when the same (es6 feature, cuts redundancy)

another example:

```
const ages = [15, 18, 21, 25, 32, 50, 55, 82];

// grab all 50/over

// const overFifty = ages.filter( age => if(age >= 50));

const overFifty = ages.filter( age => age >= 50 );
console.log(overFifty);
```

first thought, to use if statement, but unnecessary since able to pass condition -- filter will return if true and not if false

what returns true will be put into `overFifty` array

### this

using `this` with an arrow function does not bind the `this` to the function, it inherits from the parent

```
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  console.log(this);
})

```

`this` will reference `box` using normal function (above example)

```
const box = document.querySelector('.box');
box.addEventListener('click', () => {
  console.log(this);
})

```

using an arrow function `this` will reference/ inherit parent scope, in this case, window (above example)-- why? because `this` does not bind to function when arrow functions are used.

another example of inheritence and all that `this` jazz:

```
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
  // up to this point, this references box
  setTimeout(function() {
    // here, however, this references window
    this.classList.toggle('open');
  }, 5000);
})

```

the `this` used inside the setTimeout will reference window because we are using a new function, this is not bound, but inherits from parent (window) unlike...

```
const box = document.querySelector('.box');
box.addEventListener('click', function() {
  this.classList.toggle('opening');
  // up to this point, this references box
  setTimeout(() => {
    // here, using an arrow function will inherit, in this case, box (as intended)
    this.classList.toggle('open');
  }, 5000);
})

```

### default function arguments

some things you can do:

```
function calculate(total, tax, tip) {
  return total + (total * tax) + (total * tip);
}

const fullTotal = calculate(100, 0.7, 0.20);
console.log(fullTotal);
```

able to set default w/ es6:

```
function calculate(total, tax=0.7, tip=0.20) {
  return total + (total * tax) + (total * tip);
}

const fullTotal = calculate(100);
console.log(fullTotal);
```

not passing all arguments, in this case total, tax, tip they will still be implied (above example)

this is cleaner and leaner way than using an if statement for tax and tip === undefined
sidebar: undefined would be what would come up if when arguments not passed or default set up top

able to update and not have to put all params:

```
function calculate(total, tax=0.7, tip=0.20) {
  return total + (total * tax) + (total * tip);
}

const fullTotal = calculate(100, undefined, 0.25);
console.log(fullTotal);
```

above, I'm able to bump up tip percentage from what was used in default and skip over tax value by placing undefined-- you cant't just leave a blank space there, it will shoot out an error

what will happen is there will be a check for undefined defaulting to default value of 0.7 tax

### when NOT to use an arrow function

remember using `this` inherits from parent scope when using arrow function

- when you need to use `this`

- when you need a method to bind to an object

- when you need to add a prototype method

- when you need arguments obj ( ex: Array.from(arguments); )
