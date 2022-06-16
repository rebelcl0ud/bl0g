---
title: "ES6 Status - Template Strings & String Upgrades"
date: "2018-03-20"
---

### template strings

Or template literals...

At its most basic, using backticks are for template type strings
Other forms used are with double/single quotes which is cool and all, but how great are template strings though? Pretty great.

The use of template variable slots was actually one of the cool things I remember from when I was playing around with Ruby... pretty stoked this is now JS goodness.

```
const name = 'tobias';
const species = 'cat';
const sentence = `${name} is a ${species}`;

console.log(sentence);
```

### other cool stuff like... creating HTML snippets

alternative/ update to the days of needing a backslash `\` for new line:

```
var orgVer = "hey, \
    how u doin";

```

vs.

```
const dog = {
  name: 'Sam',
  breed: 'Hound',
  bio: 'Sam likes to watch Andy Griffin reruns while lounging on the couch.'
}

const betterVer = `
  <div class="dog">
    <h2>
      ${dog.name}
      <span class="breed">${dog.breed}</span>
    </h2>
    <p class="bio">${dog.bio}</p>
  </div>
`;

document.body.innerHTML = betterVersion;
```

new lines outputted, cleaner/ proper html w/o `document.createElement()`

nesting/ looping:

```
const dogs = [
  { name: 'Bandit', age: 17 },
  { name: 'Flavor', age: 11 },
  { name: 'Scrappy', age: 14 }
];

const markup = `
  <ul class="dogs">
    ${dogs.map(dog => `
      <li>
        ${dog.name} is ${dog.age} in human years.
      </li>`).join('')}
  </ul>
`;
document.body.innerHTML = markup;
```

if statements inside html:

```
const song = {
  name: 'My Own Country',
  artist: 'Pennywise'
};

const markup = `
  <div class="song">
    <p>
      ${song.name}: ${song.artist}
      ${song.featuring ? `(Featuring ${song.featuring})` : ''}
    </p>
  </div>
`;

document.body.innerHTML = markup;
```

complex data, russian doll type nesting can make code hard to maintain:

```
const soda = {
  name: 'Coca-Cola',
  company: 'Coca-Cola Co.',
  keywords: ['original', 'diet', 'zero', 'cherry', 'dasani', 'classic']
};

function renderKeywords(keywords) {
  return `
    <ul>
      ${keywords.map(keyword => `<li>${keyword}</li>`).join('')}
    </ul>
  `
}

const markup = `
  <div class="soda">
    <h2>
      ${soda.name}
    </h2>
    <p class="company">
      ${soda.company}
    </p>
    ${renderKeywords(soda.keywords)}
  </div>
`;

document.body.innerHTML = markup;
```

above^ is using a render function, concept taken from React's component seperation handling sep data/ components

### tagged templates

ability to create a function-- tag a string with function name gives ability to modify string inputted into variable.

```
function highlight() {
  // whatever returned in here affects template string below, b4 it hits the variable
  // basic example, if I return 'test', that will be what sentence variable outputs in console instead of org string
}

const name = 'Scrappy';
const age = 14;
const sentence = highlight`${name} is ${age} in human years.`

console.log(sentence);
```

another example:

```
function highlight(strings, ...values) {
  debugger;
}

const name = 'Scrappy';
const age = 14;
const sentence = highlight`${name} is ${age} in human years.`

console.log(sentence);
```

argument of `strings` and `...values`--
`strings` will snag fragments of string until it hits a variable, in the above example it would grab 'is' and then 'in human years.'

while, `...values` snags variables used, in the above example it would grab `name` and `age`

below shows debugger ouput:

```
<this>: Window
​
arguments: Arguments
​​
0: (3) […]
​​
1: "Scrappy"
​​
2: 14
​​
callee: Getter & Setter
​​
length: 3
​​
Symbol(Symbol.iterator): undefined
​​
__proto__: {…}
​
strings: (3) […]
​​
0: ""
​​
1: " is "
​​
2: " in human years."
​​
length: 3
​​
raw: (3) […]
​​
__proto__: []
​
values: (2) […]
​​
0: "Scrappy"
​​
1: 14
​​
length: 2
​​
__proto__: []
```

`...values` is pretty great to use, it picks up w.e # of values.

ability to tack on to string:

```
function highlight(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
}

// without (values[i] || '') it will output string followed by undefined because strings array is always +1 more than values array
// it is possible to use an if statement as well

const name = 'Scrappy';
const age = 14;
const sentence = highlight`${name} is ${age} in human years.`

console.log(sentence);
```

example has highlight function, below actually hightlights:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>tagging template str</title>

  <style>
    .highlighter {
      background: pink;
    }
  </style>
</head>
<body>

<script>
function highlight(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += `${string} <span class='highlighter'>${values[i] || ''}</span>`;
  });
  return str;
}

// without (values[i] || '') it will output string followed by undefined because strings array is always +1 more than values array
// it is possible to use an if statement as well

const name = 'Scrappy';
const age = 14;
const sentence = highlight`${name} is ${age} in human years.`
document.body.innerHTML = sentence;
console.log(sentence);

</script>
</body>
</html>
```

an addition to this is the ability to edit what is highlighted--
adding `contenteditable` after span tag

honestly, I don't see much of a point to doing that except just for the sake of being able to do it, but it was something I didn't know could be done just by adding that little piece of code (you learn something new everyday :D)

```
function highlight(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += `${string} <span contenteditable class='highlighter'>${values[i] || ''}</span>`;
  });
  return str;
}
```

still, the ability to modify strings through functions is something I'm looking forward to messing around with.

### more on tagged templates

in the following example, ability to not only use variables in template strings, but strings as well as shown

```
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

const name = 'JO';
const sentence = `Hey, I'm ${name} and I build stuff using ${'HTML'}, ${'CSS'}, and ${'JS'}.`;

console.log(sentence);

const bio = document.querySelector('.bio');
const p = document.createElement('p');

p.innerHTML = sentence;
bio.appendChild(p);

```

adding to previous example, another tag connecting a function to template string
the following encompasses abbreviated terms inside abbr tags, but only if it is found in dictionary

```
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

function addAbbreviations(strings, ...values) {
  const abbreviated = values.map(value => {
    if(dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`
    }
    return value;
    // ^if dict value not found to wrap inside abbr, return value or will output undefined
    // something I caught after the fact... forgot to add quotations on title making it cutoff string output (whoops) so remember to check punctuation
  })
  console.log(abbreviated);
}

const name = 'JO';
const sentence = addAbbreviations`Hey, I'm ${name} and I build stuff using ${'HTML'}, ${'CSS'}, and ${'JS'}.`;


const bio = document.querySelector('.bio');
const p = document.createElement('p');

p.innerHTML = sentence;
bio.appendChild(p);

```

example updated below to use `.reduce()` looping/building str in progress, alternative to using a `let str=` to tack onto as used in previous tagged template string section.

`.reduce()` takes function and what you're starting with `.reduce(functionHere, whatYouStartWith)`
all the magic happens within the function unlike using the `let str=` approach.

```
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

function addAbbreviations(strings, ...values) {
  const abbreviated = values.map(value => {
    if(dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`
    }
    return value;
  })
  return strings.reduce((sentence, string, i) => {
    return `${sentence}${string}${abbreviated[i] || ''}`;
  }, '');
}

const name = 'JO';
const sentence = addAbbreviations`Hey, I'm ${name} and I build stuff using ${'HTML'}, ${'CSS'}, and ${'JS'}.`;


const bio = document.querySelector('.bio');
const p = document.createElement('p');

p.innerHTML = sentence;
bio.appendChild(p);

```

I dug working through this example mainly for 2 reasons, using `.reduce()` and alternative to using `document.body.innerHTML = whateverHoldingStrVariableHere`

### sanitizing user data w/ tagged templates

sanitizing data before you put it into the DOM-
whenever you get data/display data from user you must make sure the user isn't sneaking in any bad juju, some examples mentioned: insert iframe, image, xss

avoid allowing user to run JavaScript on your page

sanitize example using template string:

```
<script src= "https://cdnjs.cloudflare.com/ajax/libs/dompurify/1.0.3/purify.min.js"></script>

<script>
function sanitize(strings, ...values) {
  const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
  return DOMPurify.sanitize(dirty);
}

const name = 'Dr. Evil'
const about = sanitize`bahaha <img src="http://unsplash.it/100/100?random" onload="alert('bad juju injected');" />`;

const html = `
  <h3>${name}</h3>
  <p>${about}</p>
`;

const bio = document.querySelector('.bio');
bio.innerHTML = html;
</script>
```

there are different ways to sanitize, above is one, another could be something like `bio.innerHTML = DOMPurify.sanitize(html);` or tagging `const html =` above.

I dig videos and all, but I like looking for the actual docs and things being used in examples.

RESOURCES:

[DOMPurify - Github](https://github.com/cure53/DOMPurify)

[DOMPurify - cdnjs](https://cdnjs.com/libraries/dompurify)

### NEW string methods

// .startsWith()

```
const team = 'Miami Heat';

team.startsWith(`Mia`); // true
team.startsWith(`mia`); // false (case sensitive), use of regex would solve that issue if needed

  // can start at certain character
  team.startsWith(`H`, 5); // false
  team.startsWith(`H`, 6); // true

```

// .endsWith()

```
const team = 'Miami Heat';

team.endsWith(`eat`); // true
team.endsWith(`iam`, 4); // true, checks up to 4 characters

// ^ also (case sensitive), use of regex would solve that issue if needed

```

// .includes()

```
const team = 'Miami Heat';

team.includes(`eat`); // true

// ^ checks anywhere in string, also case sensitive

```

// .repeat()

```
const team = 'Miami Heat';
team.repeat(5); // obv usage, repeats things w.e number

```

another case:

```
const kid1 = 'scrappy'
const kid2 = 'enigma'
const kid3 = 'sam'

function leftPad(string, length = 20) {
  return `-> ${' '.repeat(length - string.length)}${string}`;
}

console.log(leftPad(kid1));
console.log(leftPad(kid2));
console.log(leftPad(kid3));

// which console logs below

->              scrappy
->               enigma
->                  sam

```

So this doesn't turn into an endless scroll type post I'll start a new entry when I start going over Destructuring.
