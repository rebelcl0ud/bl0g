---
title: "ES6 Status - Symbols"
date: "2018-04-14"
---

7th primitive type added to JS, original 6: Number, String, Boolean, Object, null, undefined. 7th is Symbol.

Symbols are unique identifiers, help avoid naming collisions. Good time to use Symbols is when creating unique properties.

`const jo = Symbol('jo');` this is not a value, but a descripter/ unique identifier.

Example:

```
const band = {
  [Symbol('J')]: { instrument: 'guitar' },
  [Symbol('J')]: { instrument: 'guitar' },
  [Symbol('M')]: { instrument: 'drums' },
  [Symbol('J')]: { instrument: 'bass' },
  [Symbol('J')]: { instrument: 'vocals' }
}
// no conflict
```

Note: You cannot loop over Symbols.

```
for(person in band) {
  console.log(person);
}
// will not work (cannot loop over), reminder: using `for in` -- `for of` does not work on objects
```

Possible to store private data in this manner.

```
const syms = Object.getOwnPropertySymbols(band);
console.log(syms) // outputs Symbol(J), Symbol(J), Symbol(M), Symbol(J), Symbol(J), nothing more

const data = syms.map(sym => band[sym]);
console.log(data); // outputs workaround to grab info, band[sym] is band[propertyKey] access to data

```
