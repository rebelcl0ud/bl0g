---
title: "ES6 Status - YingYang Spread & Rest"
date: "2018-04-02"
---

### ...spread & ...rest

Using a `.concat()` to combine two arrays makes sense, but this `...spread` is too sweet not to prefer.

`.concat()`

```
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

const combineArrays = featured.concat(specialty);
console.log(combineArrays);

```

To throw something in the middle though using `...spread`, saves lines of reassigning variables and using `.push()` and all that jazz

```
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

const combineArrays = [...featured, 'veggie', ...specialty, 'vegan'];
console.log(combineArrays);

```

Sweeten the pot though, when 'copying' an array

```
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const weekendSpecial = featured;

weekendSpecial[0] = 'NY Style';

console.log(weekendSpecial); // ['NY Style', 'Pepperoni', 'Hawaiian'] :D
console.log(featured); // also ['NY Style', 'Pepperoni', 'Hawaiian'] now >_<

```

I wanted to make a copy of the featured options, but change one just for the weekends. However, changing the first item from my 'copy' actually changed the original featured array because it was in fact referencing. The two, in this manner, were not seperate. _booooo_

What can be done? Well, `.concat()` is an option...

```
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const weekendSpecial = [].concat(featured); // copies instead of references

weekendSpecial[0] = 'NY Style';

console.log(weekendSpecial); // ['NY Style', 'Pepperoni', 'Hawaiian'] :D
console.log(featured); // ['Deep Dish', 'Pepperoni', 'Hawaiian']; :D

```

BUT, you can ALSO use that shweeet `...spread` to get that copy without `.concat()`

```
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const weekendSpecial = [...featured]; // copies instead of references

weekendSpecial[0] = 'NY Style';

console.log(weekendSpecial); // ['NY Style', 'Pepperoni', 'Hawaiian'] :D
console.log(featured); // ['Deep Dish', 'Pepperoni', 'Hawaiian']; :D

```

TL;DR
A spread will take all things from specified array/iterable and throw it into the new array.

---

Messing with SPREAD

```
   .jump span {
      display: inline-block; /* span is inline, making it inline-block will allow the hover animation */
      transition: transform 0.2s;
      cursor:url('http://csscursor.info/source/santahand.png'), default;
    }
    .jump span:hover {
      transform: translateY(-20px) rotate(10deg) scale(2);
    }
  </style>
</head>
<body>
  <h2 class="jump">SPREADS!</h2>

<script>
const heading = document.querySelector('.jump');
heading.innerHTML = spanWrap(heading.textContent);
console.log(heading);

function spanWrap(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}

</script>
</body>
</html>

```

Didn't add all CSS associated, but the point is to show spread being used within a function on a string where each letter is animated to move on hover.

RANDOM NOTE: something I'm not sure I've figured out when needed, but did not know off the top of my head... you can't animate a span(inline), inline-block is what got it to ^work.

---

MOAAAAR [or *more*, for the serious] spread examples:

I. Kicking it off with a NodeList:

```
const dogs = document.querySelectorAll('.dogs p');

console.log(dogs); // NodeList atm

```

^As is, you can't map this baby, but we totally have done this before soooo...

We can use an `Array.from()` to convert our NodeList into an Array:

```
const dogs = Array.from(document.querySelectorAll('.dogs p'));
console.log(dogs); // yay Array

const names = dogs.map(dog => dog.textContent);
```

Or... it's totally possible to use a spread on the doc selector line (O_O)

```
const dogs = [...document.querySelectorAll('.dogs p')];
console.log(dogs); // yay Array

const names = dogs.map(dog => dog.textContent);

```

II. When creating a new array off an object property:

```
const joSpecial = {
    pizzaName: 'joSpecial',
    size: 'Medium',
    ingredients: ['Marinara', 'Spinach', 'Dough', 'Cheese', 'Banana Pepper']
  };

const groceryList = ['leche', 'flour', ...joSpecial.ingredients];
console.log(groceryList);

```

^Combines lists, true copy not reference.

III. When you have an array of objects and need/want to remove one of them:

```
const comments = [
  {id: 111222, text: 'Your dog is adorable'},
  {id: 222333, text: 'Swoooooon'},
  {id: 333444, text: 'Please evaporate'},
  {id: 444555, text: 'I miss your FACE'}
];

console.log(comments);

```

You want to remove the comment asking you to 'Please evaporate', so u snag id of that comment to find out position in array:

```
const id = 333444;

const removeIndex = comments.findIndex(comment => comment.id === id);

console.log(removeIndex); // 2

```

You find out it's at index 2, so let's remove that sucker using `slice()`:

```
const keepers = [comments.slice(0, removeIndex), comments.slice(removeIndex + 1)];

console.log(keepers); // removes, but leaves you with an array of arrays

```

You got it removed and all, buuuuut you got an array of 2 arrays... the fix? use SPREAD

```
const keepers = [...comments.slice(0, removeIndex), ...comments.slice(removeIndex + 1)];

console.log(keepers); // one full array

```

Now, we got ourselves a nice little array of lovely comments that make your heart smile :D

### spreading into a function

I.

Using `.push()` is cool and all, but it will give you one of those situations where you get an array within an array

```
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];

inventors.push(newInventors);

console.log(inventors); // gives an array within an array

```

You do got that `.push.apply()` option that does in fact give you the combined array you're looking for

```
inventors.push.apply(inventors, newInventors);

console.log(inventors); // this gives whole array containing all 5 inventors

```

But, then you got that _spread_ option that (imo) looks so much prettier to read

```
inventors.push(...newInventors);

console.log(inventors); // using spread takes that array passing each item as individual arguments, spread into function

```

II.

```
const name = ['jo', 'shmo'];

function sayHi(first, last) {
  alert(`Hi ${first} ${last}!`);
}

sayHi(...name);

```

^Instead of doing something like `sayHi(name[0], name[1]);`, time saver especially if there were more arguments to throw in there.

### ...rest param

`...rest` param looks like `...spread`, but does the opposite. While ...spread unpackages an array, ...rest bundles them.

I. used in a function

Something like `function convertCurr(rate, amt1, amt2, amt3, amt4) {}` or instead, toss all that and use `arguments`, `function convertCurr() {arguments}`.

Since we want the first thing to be the rate and then the _rest_ to be the amounts one would like to convert we use a ...rest to package various ammounts into a tidy array :D

```
function convertCurr(rate, ...amounts) {
  console.log(rate, amounts); // outputs 1.54 (rate) and then the rest (amounts) Array(5) [ 10, 23, 52, 1, 56 ]
  return amounts.map(amount => amount * rate);
}

const amounts = convertCurr(1.54, 10, 23, 52, 1, 56);

console.log(amounts); // outputs Array(5) [ 15.4, 35.42, 80.08, 1.54, 86.24000000000001 ]

```

II. used in a destructuring situation

`const crew = ['Han', 'Chewie', 'Luke', 'C3PO', 'R2D2'];` takes pilot, copilot, and the _rest_ of the passengers.

To group the passengers together, and since it is an array we are destructuring we use `[]` and three variables we are packing things into -> pilot, copilot, ...passengers

Using rest bundles up the passengers into a nice tidy array.

```
const crew = ['Han', 'Chewie', 'Luke', 'C3PO', 'R2D2'];

const [pilot, copilot, ...passengers] = crew;

console.log(pilot, copilot, passengers); // outputs Han Chewie Array(3) [ "Luke", "C3PO", "R2D2" ]

```

NOTE: Don't forget to take out the ...rest when copy/pasting into console.log _>\_<_
