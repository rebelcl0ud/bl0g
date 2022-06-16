---
title: "ES6 Status - Arrays & Stufffffff"
date: "2018-04-02"
---

### array stufffffff

`.from()` & `.of()` are not part of the prototype. Creating an array `const ages = [13, 15, 21, 32, 35];` and `console.log`-ing `ages.from()` or `ages.of()` would result in a `TypeError: ages.from is not a function` error.

On Array itself however, `Array.from()` or `Array.of()` would be used to convert something that's Array-ish into a legit Array (liiiiiike NodeLists or arguments).

NodeList -> Array:

```
<div class="kids">
  <p>Scrappy</p>
  <p>Enigma</p>
  <p>Sammy</p>
</div>

<script>
const kids = Array.from(document.querySelectorAll('.kids p'));
console.log(kids);
const names = kids.map(kids => kids.textContent);
console.log(names);

</script>
</body>
</html>
```

`Array.from()` can take a 2nd argument, a map function. Instead, of using `Array.from()` on the doc selector use `Array.from();` giving it 2 arguments, the first have the NodeList, the second a function to map over list

```
const kids = document.querySelectorAll('.kids p');

console.log(kids); // ^NodeList

const names = Array.from(kids, kid => {
  console.log(kid); // outputs actual DOM node
  return kid.textContent;
});

console.log(names); // array of names

```

Arguments -> Arrays:

```
function sumAll() {
  // console.log(arguments);
  const arr = Array.from(arguments);
  return arr.reduce((prev, next) => prev + next, 0);
}

sumAll(2, 4, 6, 8);

```

`Array.of()` is pretty straight forward

```
const ages = Array.of(12, 15, 4);
console.log(ages);

```

Looking through the proto dropdown you'll see all the usual Array type stuff like `.join()`, `.pop()`, `.push()`, etc.

---

`Array.find()` & `Array.findIndex()`

Common use case is when looking through data that has come from an API, example an array of object items.

`.find()` will return a true or false. Example: `const post = Posts.find(post => post.code === 'whatevercodehere');` will iterate through until it finds specific post, `console.log(post);` will output found obj containing what you had it look for (if it actually is there, of course).

If you were looking for multiple, `.filter()` would be output an array of objects, not just one like above.

`.findIndex()` is when you know what you want, but looking for where in the array it is, position/index-wise. Use case? Position in array to delete item. Example: `const post = Posts.findIndex(post => post === 'whatevercodehere')` similar to `.find()` is a true/false type deal. `console.log`ing would output whatever index.

---

`Array.some()` & `Array.every()`

These are not part of ES6, but apparently Wes doesn't feel they get the love they deserve so he's covering them :D

They check the data in an array to check if some of the items meet criteria you're looking for or all items meet what you're looking for.

`Array.some()`:

```
const ages = [15, 13, 25, 30, 32];

// is there atleast one person over 18/adult

const adultPresent = ages.some(age => age >= 18);
console.log(adultPresent); // outputs true as soon as it hits 25

```

`Array.every()`:

```
const ages = [15, 13, 25, 30, 32];

// is everyone old enough to drink

const oldEnoughToDrink = ages.every(age => age >= 21);
console.log(oldEnoughToDrink); // outputs false since there are youngins in the squad

```
