---
title: "ES6 Status - Yellow Brick Road"
date: "2018-03-20"
---

This is me yellow brick road-ing… to better grasp JS/ES6

Note: I started with Kyle Simpson's [YDKJS](https://github.com/getify/You-Dont-Know-JS) books, the following references Wes Bos's [ES6](https://es6.io/) videos. Excellent combo, imo.

### var scope

`var` can be updated/redefined and function-scoped, which means they can only be used within the function they were declared (local) unless global. Global means they are available from wherever they are called.

When used within an if statement block (no function) the var/value will leak out because it doesnt stay local (not block-scoped), which can totes be a problem.

### let & const

`let` and `const` are block-scoped variables.

### let

when using `let` redeclaring will give error unlike `var` that will allow the redeclare giving no error (redeclaring `var` can cause a problem if for whatever reason you forget you used a particular variable name somewhere else in the script). You can reassign however.

using a `let` variable of the same name in different scopes will be treated independently.

### const

when using `const` variable, they cannot be updated (unlike `let`)

### using var & let & const

having a `var` as a global variable can be problematic using certain variables as it may accidently interfere with the window itself--

using `var name = JO;`

good practice is to place it within an IIFE (pronounced 'iffy'), Immediately-Invoked Function Expression, a function that runs itself creating scope and preventing leak into parent scope. In this case it would be the window.

checking for name will work, however window has `name` attribute
(ex: needing opening of 2nd window) or perhaps an attribute used by something else you happen to use (ex: 3rd party)

hence, the usage of IIFE mentioned above.

```
(function(){
  var name = JO;
  console.log(name); // JO
})();

// "" showing blank/empty outside of scope as it is a window property, meaning var used previously is not leaking outside function
```

using `const name = JO;`
would return the same used globally, but to prevent leaking in this case it just needs to be used within a block

```
{
  const name = JO;
  console.log(name); // JO
}

// outside will return "" same as before, name is window property
```

### for loops

```
for(var i=0; i < 10; i++) {
  console.log(i);
}

// here var i would iterate and count to 9, but calling i would show value of ten, var, global var, leaked
```

another example of var behavior...

```
for(var i=0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// by the time setTimeout runs (in this case 1 sec) it would have iterated through, the number 10 will output 10x instead of iterating and counting through to 9 as with previous example

why? not outputting right away as with first example, var is being reassigned/overwritten.

Similar to AJAX request iteration, no good way than use an IIFE? to ref i --why?
```

swapping out `var` for `let`...

```
for(let i=0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// this will output correctly, iterating and counting as each value of i passes through and no 10 as with initial example, the variable is not global, it is block-scoped
```

`const` as mentioned before cannot be used^, not allowed to use variable more than once, will shoot out error

### temporal zone? Meh, how about the phantom zoooone :D

```
var soda = 'Coke';
console.log(soda);

// this will output 'Coke'

```

if we switch it up?

```
console.log(soda);
var soda = 'Coke';

// this will output 'undefined', it will find the var variable, but not the var value (ex: 'Coke') in comparison to using const & let where you cannot access variable before it is defined

```

### so... no var then?

`const` is not immutable, it creates an immutable binding.

For example:

```
const whut = {}
whut.who = 'you';
console.log(whut.who) // 'you'

// above is acceptable

```

vs.

```
const whut = 32
whut = 7; // assignment operators
console.log(whut);

// above will throw out TypeError exception

```

vs.

```
const whut = 32
whut.who = 7;
console.log(whut.who) // undefined

// above will throw out an error

```

leading opinions on usage as follows...

[Mathias Bynens]

- use `const` as default
- use `let` when rebinding is needed (which means updating variable)
- `var` should not be used in ES6

[Kyle Simpson]

- use `var` for top-level variables shared across many (~larger) scopes
- use `let` for localized variables in smaller scopes
- refactor `let` to `const` only after reasonable certainty there shouldn't be variable reassignment

For immutable values, to make immutable arrays/objects use `Object.freeze();`

Do not use `const` to make constant (immutable) values, use for non-reassignable variables
