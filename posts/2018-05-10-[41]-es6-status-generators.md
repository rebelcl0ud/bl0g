---
title: "ES6 Status - Generators"
date: "2018-05-10"
---

generator functions offer multiple type returns using yield.

Note: the \* can be put after function or before function name.

```
function* listDogs() {
  yield 'scrappy';
  yield 'enigma';
  yield 'sam';
}

const dogs = listDogs();

```

when inputting dog in console, output will give generator status info
however, inputting `dog.next()` will "return" or `yield` first object with value of `scrappy` along with `done: ` status. The status will show as false until it finishes running function. In this case, it will show `done: false` until AFTER sam output, then showing `done: true`

the above example is hardcoded, but dynamically generated variables is possible, example below.

```
function *listDogs() {
  let i = 0;
  yield i;
  i++;
  yield i;
  i++;
  yield i;
}

const dogs = listDogs();

```

gist: generator functions will keep its variables until it is finished, and able to yield multiple values from it.

```
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879 },
  { first: 'Isaac', last: 'Newton', year: 1643 },
  { first: 'Galileo', last: 'Galilei', year: 1564 },
  { first: 'Marie', last: 'Curie', year: 1867 },
  { first: 'Johannes', last: 'Kepler', year: 1571 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
  { first: 'Max', last: 'Planck', year: 1858 },
];

function* loop(arr) {
  for (const item of arr) {
    yield item;
  }
}

const inventorGen = loop(inventors);

```

[^inventors ex used by wes bos]

multiple use of `yield` unnecessary (1st ex), using one like above will "return"/ yield each inventor.

input of `inventorGen` in console will output `Generator { }` with dropdown of prototype methods built in such as `next()`.

`inventorGen.next()` outputs first object from above example, for quick display of info use `inventorGen.next().value`- will display `Object { first: "Isaac", last: "Newton", year: 1643 }` instead of `Object { value: {…}, done: false }`.

### generators for ajax flow control

generators have waterfall ability-like ajax requests.

ex: /search/artist -> /id/456 -> /album/123, needing info from the previous req in order to do another one.

```
function* steps() {

  console.log('fetching..');
  const artist1 = yield ajax('https://api.discogs.com/artists/51980');
  console.log(artist1);

  console.log('fetching...');
  const artist2 = yield ajax('https://api.discogs.com/artists/51961');
  console.log(artist2);

  console.log('fetching....');
  const artist3 = yield ajax('https://api.discogs.com/artists/51988');
  console.log(artist3);

}

```

example^ showing if one were to need first ajax request for following requests, not that this is actually necessary in this particular case.

`const dataGenerator = steps();` this creates generator

following function will call each ajax (above^ ex) after each one "returns"/yields data. Instead, of manually calling `next()` as with previous examples the below function calls it for us.

```
function ajax(url) {
  fetch(url).then(res => res.json()).then(res => dataGenerator.next(res));
}

```

_whut?_ :D

putting it all together w/ breakdowns:

```
function ajax(url) {
  fetch(url).then(res => res.json()).then(res => dataGenerator.next(res));
}

function* steps() {

  console.log('fetching..');
  const artist1 = yield ajax('https://api.discogs.com/artists/51980');
  console.log(artist1);

  console.log('fetching...');
  const artist2 = yield ajax('https://api.discogs.com/artists/51961');
  console.log(artist2);

  console.log('fetching....');
  const artist3 = yield ajax('https://api.discogs.com/artists/51988');
  console.log(artist3);

}

const dataGenerator = steps();
dataGenerator.next();

```

- on page load a brand new generator gets created
- `dataGenerator.next()` kicks off generator (aka-> steps())
- which will get the first one (artist1) to run
- which will request ajax
- which will run url
- when data comes back, next() is called until it cycles through "returns"/yields

Note: whatever passed in next() will go back to generator, stored in variable

console output:

```
fetching..
>Object { profile: "Synth funk - brit house british quintet assisted by [a=Paul Weller]", releases_url: "https://api.discogs.com/artists/51980/releases", name: "Black Britain", uri: "https://www.discogs.com/artist/51980-Black-Britain", members: (3) […], images: (1) […], resource_url: "https://api.discogs.com/artists/51980", id: 51980, data_quality: "Needs Vote", aliases: (1) […] }

fetching...
>Object { profile: "", realname: "Luis Paris", releases_url: "https://api.discogs.com/artists/51961/releases", name: "Quadraphonics", uri: "https://www.discogs.com/artist/51961-Quadraphonics", resource_url: "https://api.discogs.com/artists/51961", id: 51961, data_quality: "Correct", aliases: (1) […] }

fetching....
>Object { profile: "Rapper.\r\nBorn: August 19, 1970, Bronx, New York, USA.\r\n\r\nRaised in the South Bronx area of New York. Part of the [a=D.I.T.C.] Crew.\r\n", realname: "Joseph Antonio Cartagena", releases_url: "https://api.discogs.com/artists/51988/releases", name: "Fat Joe", uri: "https://www.discogs.com/artist/51988-Fat-Joe", urls: (2) […], images: (8) […], resource_url: "https://api.discogs.com/artists/51988", aliases: (2) […], id: 51988, … }

```

### looping generators with 'for of'

`for of` loop works on generators, no use of manual `next()` or recursive function

```
function* lyrics() {
  yield `We are a part of the rhythm nation`;
  yield `People of the world unite`;
  yield `Strength in numbers we can get it right`;
  yield `One time`;
  yield `We are a part of the rhythm nation`;
}

const rhythmNation = lyrics();

for(const line of rhythmNation) {
  console.log(line);
}

```

REwind, taking it back to old school janet jackson :P
