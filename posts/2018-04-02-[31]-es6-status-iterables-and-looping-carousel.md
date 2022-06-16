---
title: "ES6 Status - Iterables & Looping Carousel"
date: "2018-04-02"
---

### iterables & looping

`const dogs = ['beagle', 'dalmation', 'golden retriever', 'pug', 'labrador'];`

The classic `for loop`
The following type of for loop became the main one used, but only after getting some used to. Although, it does do what it's meant to do, syntax may not be as readable as it could be.

```
for(let i = 0; i < dogs.length; i++) {
  console.log(dogs[i]);
}

```

Then, there's the `forEach`
This one actually made the most sense to me when I first started trying to wrap my head around JavaScript. The reason, I got my basic grasp of web dev workings messing with Ruby which had something similar.

```
dogs.forEach((dog) => {
  console.log(dog);
})

```

Cannot pause loop, cannot skip items
Cannot use `break` or `continue` inside a `forEach` loop

The `for in` loop:

```
for(const index in dogs) {
  console.log(dogs[index]);
}

```

This gives index, snag values as follows, but...

there are many methods on a prototype, if you were to add one and then reiterate it will reiterate all things in array including anything added. [example] custom prototype method or property added to array.

The `for of` loop:

```
for(const dog of dogs) {
  console.log(dog)
}

```

This is like the one that brings all the good stuff from those above into one, sorta. It will return what is in the array w/o anything extra like if prototype was modified and able to use `break` and `continue`. NOTE: `for of` loops can be used on anything except objects.

### for of loop on the field

```
for(const dog of dogs) {
  console.log(dog)
}

// will output:
beagle
dalmation
golden retriever
pug
labrador

```

^Seems there really isnt a good way to snag index.

In comes `dogs.entries()` which `console.log`s an Array Iterator with a `next()` method

```
dogs.entries()
  Array Iterator
  ​
    __proto__: Array Iterator
    ​​
    next: next()
    ​​​
    length: 0
    ​​​
    name: "next"
    ​​​
    __proto__: ()
    ​​​​
    apply: function apply()
    ​​​​
    arguments: null
    ​​​​
    bind: function bind()
    ​​​​
    call: function call()
    ​​​​
    caller: null
    ​​​​
    constructor: function Function()
    ​​​​
    length: 0
    ​​​​
    name: ""
    ​​​​
    toSource: function toSource()
    ​​​​
    toString: function toString()
    ​​​​
    Symbol(Symbol.hasInstance): undefined
    ​​​​
    __proto__: Object { … }
    ​​
    Symbol(Symbol.toStringTag): undefined
    ​​
    __proto__: {…}
    ​​​
    Symbol(Symbol.iterator): undefined
    ​​​
    __proto__: Object { … }

```

When stored in a variable `const pups = dogs.entries();` you are able to iterate manually `pups.next();`, but placing it within `for of` loop `console.log`s

```
for(const dog of dogs.entries()) {
  console.log(dog)
}

// will output:
Array [ 0, "beagle" ]
Array [ 1, "dalmation" ]
Array [ 2, "golden retriever" ]
Array [ 3, "pug" ]
Array [ 4, "labrador" ]

```

However, present setup requires `console.log(dog[0], dog[1]);` to get index with dog

```
// console.log output:
0 beagle
1 dalmation
2 golden retriever
3 pug
4 labrador

```

A better approach, destructuring with optional use of template strings

```
for(const [i, dog] of dogs.entries()) {
  console.log(`${i}: ${dog}`);
}

// will output:
0: beagle
1: dalmation
2: golden retrieve
3: pug
4: labrador

```

Iterating using `arguments`:

```
function addUpNum() {
  let total = 0;
  for (const num of arguments) {
    total += num;
  }
  console.log(total);
  return total;
}

addUpNum(10, 20, 32, 35, 15); // 112

```

Using arguments gives you something similar to an array, but it is NOT an array.

```
function addUpNum() {
  console.log(arguments);
}

addUpNum(10, 20, 32, 35, 15); // 112

// console.log returns:

Arguments
​
0: 10
​
1: 20
​
2: 32
​
3: 35
​
4: 15
​
callee: function addUpNum()
​
length: 5
​
Symbol(Symbol.iterator): undefined
​
__proto__: Object { … }

```

A true array will show prototype methods included with arrays, arguments will only provide length. However, arguments will provide iterator method.

```
// console.log([10, 20, 32, 35, 15]) returns

Array(5) […]
​
0: 10
​
1: 20
​
2: 32
​
3: 35
​
4: 15
​
length: 5
​
__proto__: []
​​
concat: function concat()
​​
constructor: function Array()
​​
copyWithin: function copyWithin()
​​
entries: function entries()
​​
every: function every()
​​
fill: function fill()
​​
filter: function filter()
​​
find: function find()
​​
findIndex: function findIndex()
​​
forEach: function forEach()
​​
includes: function includes()
​​
indexOf: function indexOf()
​​
join: function join()
​​
keys: function keys()
​​
lastIndexOf: function lastIndexOf()
​​
length: 0
​​
map: function map()
​​
pop: function pop()
​​
push: function push()
​​
reduce: function reduce()
​​
reduceRight: function reduceRight()
​​
reverse: function reverse()
​​
shift: function shift()
​​
slice: function slice()
​​
some: function some()
​​
sort: function sort()
​​
splice: function splice()
​​
toLocaleString: function toLocaleString()
​​
toSource: function toSource()
​​
toString: function toString()
​​
unshift: function unshift()
​​
values: function values()
​​
Symbol(Symbol.iterator): undefined
​​
Symbol(Symbol.unscopables): undefined
​​
__proto__: Object { … }

```

NOTE: It is possible and sometimes may be neccessary to convert `arguments` into an array, but if kept as is those would be differences to keep in mind.

Iterating strings:

```
const name = 'MysticalState'

for(const char of name) {
  console.log(char);
}

```

NOTE: remember to put in `const`, `let`, or even `var` in `for of` loop as usual or it will override the actual variable every single time instead of creating a scoped variable to that block.

Iterate over DOM collections without converting to array:

```
... html, body and all that jazz here

<p>P 01</p>
<p>P 02</p>
<p>P 03</p>
<p>P 04</p>
<p>P 05</p>


<script>
const ps = document.querySelectorAll('p');
console.log(ps);
</script>
</body>
</html>

```

^This `console.log`s NodeList which offers array methods on certain browsers, but not all. May have to convert to true array.

```
const ps = document.querySelectorAll('p');

for(const paragraph of ps) {
// console.log(paragraph);

  paragraph.addEventListener('click', function() {
    console.log(this.textContent);
  })
}

```

Able to use `for of` on things even when they are not arrays as long as they are iterable.
_What are iterables?_ DOM collections, strings, arguments, arrays, maps, sets

### no objects with for of loops, yea?

```
const watermelon = {
  size: 'large',
  weight: 100,
  type: 'fruit'
}

for(const prop of watermelon) {
  console.log(prop); // ERROR
}

```

^TypeError: watermelon is not iterable

So, what _CAN_ we do?
`Object.values()` and `Object.entries()`

Presently, giving `TypeError: watermelon.entries is not a function` error _womp womp womp_, however according to [proposals](https://github.com/tc39/proposal-object-values-entries) they will be included in ES2017.

NOTE: [polyfill is available](https://github.com/es-shims/Object.entries)

_What is a polyfill?_ adds unsupported features back in

If you can't use a polyfill?

```
const watermelon = {
  size: 'large',
  weight: 100,
  type: 'fruit'
}

for(const prop of Object.keys(watermelon)) {
  console.log(prop); // gives size, weight, type
}

```

```
const watermelon = {
  size: 'large',
  weight: 100,
  type: 'fruit'
}

for(const prop of Object.keys(watermelon)) {
  const values = watermelon[prop];

  console.log(prop, values); // outputs size, weight, type and large, 100, fruit
}

```

Not the cleanest solution since we're going outside to snag stuff, but it is possible to use. Of course, using `for of` loop isn't exactly necessary. There are other options like `for in` loop which will give same output without the use of `Object.keys()`

```
const watermelon = {
  size: 'large',
  weight: 100,
  type: 'fruit'
}

for(const prop in watermelon) {
  const values = watermelon[prop];
  // console.log(prop); // outputs size, weight, type
console.log(prop, values); // outputs large, 100, fruit
}

```

^best option to use for objects until `Object.values()` and `Object.entries()` arrive
