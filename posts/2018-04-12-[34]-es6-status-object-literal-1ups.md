---
title: "ES6 Status - Object Literal 1UPs"
date: "2018-04-02"
---

### object literal upgrades

If property name and variable setting it to are the same, they don't need to be written twice:

```
const name = 'enigma';
const age = 12;
const breed = 'lab mix';

// this
const dog = {
  name: name,
  age: age,
  breed: breed
};

// same as this
const dog = {
  name,
  age,
  breed
};

console.log(dog);

```

Method definitions:

Instead of this...

```
const modal = {
  create: function() {

  },
  open: function() {

  }
  close: function() {

  },
}

```

able to shorthand to this...

```
const modal = {
  create() {

  },
  open() {

  }
  close() {

  },
}

```

use with params...

```
const modal = {
  create(paramHere) {

  },
  open(paramHere) {

  }
  close(paramHere) {

  },
}

```

Computed property names:

```
const key = 'pocketColor';
const value = 'blue';

const tshirt = {
  [key]: value // always possible
};

console.log(tshirt); // outputs Object { pocketColor: "blue" }

```

So, _what's new?_

Ability to compute property keys inside of obj literal as we define it. Compute copy; use function, template string or any other JS inside of property name. Properties/ values being dynamically set.

```
// invertColor(value) would be a function where value would be taken in and output opposite color

const key = 'pocketColor';
const value = 'blue';

const tshirt = {
  [key]: value,
  [`${key}Opposite`]: invertColor(value)
};

console.log(tshirt); // outputs Object { pocketColor: "blue", pocketColorOpposite: "yellow" }

```

Previously,

```
const key = 'pocketColor';
const value = 'blue';

const tshirt = {}; // make tshirt obj

// update tshirt object (below)
tshirt[key]= value,
tshirt[`${key}Opposite`]= invertColor(value)

console.log(tshirt); // outputs Object { pocketColor: "blue", pocketColorOpposite: "yellow" }

```

APIs and their sometimes janky data example:

```
const keys = ['size', 'color', 'weight'];
const values = ['med', 'black', 100];

const shirt = {
	[keys[0]]
}

```

^computed property type name, but another option is something like the following

```
const keys = ['size', 'color', 'weight'];
const values = ['med', 'black', 100];

const shirt = {
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
}

console.log(shirt); // outputs Object { size: "med", color: "black", weight: 100 } O_O

```

Essentially, snagging each key, value as it goes through.

This seems a little odd to me as I'm repeating code. Doing some sort of looping would seem to make more sense, maybe. Maybe there's more to this... Presently, I don't see it, but I'm a n00b so... I def need to come back to this.
