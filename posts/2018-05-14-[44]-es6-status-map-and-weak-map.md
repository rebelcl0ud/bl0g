---
title: "ES6 Status - Map and Weak Map"
date: "2018-05-14"
---

Sets are to arrays what map is to objects. Map works similar to sets, but have key and value instead of just values (as with a set).

Able to use `.has()` and `.delete()` like with sets, but unlike sets able to use `.get()` to reference items.

```
const pups = new Map();

pups.set('reese', 2);
pups.set('tuxx', 4);
pups.set('texx', 6);

```

`pups.has('reese')` in console => true
`pups.get('reese')` in console => 2
`pups.delete('reese')` in console => true, `pups` in console then => `Map { tuxx → 4, texx → 6 }`

Able to loop with `for each`:

```
pups.forEach((pupVal, pupKey ) => {
  console.log(pupVal, pupKey)
});

```

which will console:

```
2 reese
4 tuxx
6 texx

```

Able to loop using `for of`:

```
for(const pup of pups) {
  console.log(pup);
}

```

which will console:
An array, first item being key and second item being value.

```
Array [ "reese", 2 ]
Array [ "tuxx", 4 ]
Array [ "texx", 6 ]

```

Using deconstruction:

```
for(const [pupKey, pupVal] of pups) {
  console.log(pupKey, pupVal);
}

```

will console:

```
reese 2
tuxx 4
texx 6

```

_So, why use map instead of object?_ metadata

### map metadata with DOM node keys

a unique map property over regular object is ability to use an object as key in a map.

with a regular object you can only use a string as key, while map can contain an object as key that can then have value as a string, number, or another object.

example:
recording number of times each button is pressed without putting the click count on the element itself (_why?_ if element were to be removed count would go with it and also not very clean looking)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maps!</title>
  <style>
    button {
      font-size: 50px;
      margin:10px;
    }
  </style>
</head>
<body>

<button>do</button>
<button>re</button>
<button>me</button>
<button>fa</button>
<button>sol</button>
<button>la</button>
<button>ti</button>

<script>
  const clickCount = new Map();
  const buttons = document.querySelectorAll('button');


  // loop buttons and add to map
  buttons.forEach(button => {
    clickCount.set(button, 0);
  })

</script>
</body>
</html>

```

console output: at this point if you console clickCount, it will show button as key

```
Map(7)
​
  size: 7
  ​
  <entries>
  ​​
    0: <button> → 0
    ​​
    1: <button> → 0
    ​​
    2: <button> → 0
    ​​
    3: <button> → 0
    ​​
    4: <button> → 0
    ​​
    5: <button> → 0
    ​​
    6: <button> → 0

```

addition of click event listener and registering number of clicks

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maps!</title>
  <style>
    button {
      font-size: 50px;
      margin:10px;
    }
  </style>
</head>
<body>

<button>do</button>
<button>re</button>
<button>me</button>
<button>fa</button>
<button>sol</button>
<button>la</button>
<button>ti</button>

<script>
  const clickCount = new Map();
  const buttons = document.querySelectorAll('button');


  // loop buttons and add to map
  buttons.forEach(button => {
    // add each button to map, button as key and default of 0
    clickCount.set(button, 0);
    button.addEventListener('click', function() {
      // 'this' will pertain to button
      const val = clickCount.get(this);
      clickCount.set(this, val + 1);
      // will output map showing number of clicks for each button
      console.log(clickCount)
    })
  })

  // use case of map for storing metadata-- holds info about an object, but not necessarily on the object.

</script>
</body>
</html>

```

### weakmap + garbage collection

much like a weakset where it gets garbage collected

weakmap has no size, not innumerable- cannot loop over it, items inside that no longer exist anywhere in your script will get garbage collected/ removed from weakmap

normal map vs weakmap:

```
let pup1 = {name: 'scrapps'};
let pup2 = {name: 'tuxx'};

const reg = new Map();
const weak = new WeakMap();

// adding to reg map, using obj as keys
reg.set(pup1, 'scrappy <3');
weak.set(pup2, 'zen master tuxx');

```

^`weak.size` will return undefined while `reg.size` will return 1

when deleting, the weakmap should update itself while the regular map still holds to the item eventhough it doesnt exist (memory leak)

however, like with weakset example, this follow along didn't work for me in console. Even after a few seconds weakmap still showed object _womp womp womp_ although, obviously it did work in the video I was watching 0.0

```
let pup1 = {name: 'scrapps'};
let pup2 = {name: 'tuxx'};

const reg = new Map();
const weak = new WeakMap();

// adding to reg map, using obj as keys
reg.set(pup1, 'scrappy <3');
weak.set(pup2, 'zen master tuxx');

pup1 = null;
pup2 = null;

```
