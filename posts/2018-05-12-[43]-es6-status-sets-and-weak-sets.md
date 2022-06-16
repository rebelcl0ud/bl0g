---
title: "ES6 Status - Sets and Weak Sets"
date: "2018-05-12"
---

A set is like a unique array-- no copies of items, no accessing individual items and not index-based. Set, a list of items able to add to, remove from and loop over.

I.
creating a new set: `const dogs = new Set();`
adding to set: `dogs.add('scrappy');` and so on with additional names.

when you open in browser and type dogs in console, returns set with dog/names inside, `Set(3) [ "scrappy", "flavor", "bandit" ]`

similar to array, but notable differences shown in dropdowns within console output. such as, with `.size()` similar to `.length()` in arrays.

```
Set(3)
​
    size: 3
    ​
    <entries>
    ​​
      0: "scrappy"
      ​​
      1: "flavor"
      ​​
      2: "bandit"
      ​
    <prototype>: {…}
    ​​
      add: function add()
      ​​
      clear: function clear()
      ​​
      constructor: function Set()
      ​​
      delete: function delete()
      ​​
      entries: function entries()
      ​​
      forEach: function forEach()
      ​​
      has: function has()
      ​​
      keys: function values()
      ​​
      size: Getter
      ​​
      values: function values()
      ​​
      Symbol(Symbol.iterator): function values()
      ​​
      Symbol(Symbol.toStringTag): "Set"
      ​​
      <prototype>: Object { … }

```

to `delete` from set: `dogs.delete('bandit');`, input of dogs in console will return edited set.

to clear set: `dogs.clear();` will remove all items from inside set.

calling `dogs.values()` will output `SetIterator` which gives ability to loop over set and like a generator can call `next()` on it.

```
// console
const whuuut = dog.values()

whut.next(); // console.logs Object { values: "scrappy", done: false }

```

^with each next, value output changes, moving through the list until it is done.

```
for(const dog of dogs) {
  console.log(dog);
}

```

^which will output names in dog set

Note: in SETS, no difference btwn `.keys()` and `.values()`, `.entries()` will show key/values same

II.
can declare a set with values in it/ pass it just like you would an array, `const kids = new Set(['bandit', 'flavor', 'scrappy']);`

can create a set when passing an array...
here's existing array, `const hamsters = ['ernie', 'ozzie', 'tommy'];` that can be passed into new set, `const hamsterSet = new Set(hamsters);`

hamsters input will show array while hamsterSet will show set.

`.has()` can be used to check if set HAS a certain item which will return a true or false.

### moaaarrrrr on sets

```
const signing = new Set();
  // as people start coming in
  signing.add('jo');
  signing.add('bill');
  signing.add('ted');

  // ready to open!
    // so take values^ to use
  const line = signing.values();

  // working with line, who's up?
    // line.next() gives generator item, .value() gives actual item of set
    // each .next() called removes from line
  console.log(line.next().value); // first up
  console.log(line.next().value); // second up

  // cont adding to set
  signing.add('lara');
  signing.add('jayna');
  console.log(line.next().value); // next up
  console.log(line.next().value); // next up

  // can still add to set after initial creation, as well as after creating line-- will still iterate through

```

### weak sets

similar to a set with some limitations

- a `WeakSet` can only contain objects
- cannot loop over, no iterator
- no `.clear();`

```
let dog1 = { name: 'scrappy', age: 14 };
let dog2 = { name: 'enigma', age: 12 };

const weakStatus = new WeakSet([dog1, dog2]);



```

weak sets, in a sense, clean themselves up (i.e. garbage collection/ memory)
in other words, if dog1 object was to be deleted it would in turn be (automatically garbage collected) taken out from weak set itself.

```
let dog1 = { name: 'scrappy', age: 14 };
let dog2 = { name: 'enigma', age: 12 };

const weakStatus = new WeakSet([dog1, dog2]);

console.log(weakStatus);
dog1 = null;
console.log(weakStatus);

```

this example didn't work out as it did in the vid I was following o_O

upon refresh it console.log-s set as if there was no null _referenced in vid as a memory leak (i.e., referencing something that cannot be referenced otherwise)_

after a few sec input of weakStatus should return dog2 only, since deleted dog1 in JS weak set runs garbage collectoion checking to see which of its items no longer exists

however, no matter what browser or how many seconds waited it would still return same number of objects when I did it _womp womp womp_
