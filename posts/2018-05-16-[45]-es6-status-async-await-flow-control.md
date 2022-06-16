---
title: "ES6 Status - Async + Await Flow Control"
date: "2018-05-16"
---

asyncronous vs. syncronous: syncronous is when one thing finishes before another while asyncronous can have a task start, then immediately move on whether that initial task finished or not.

async + await just pauses for certain info without blocking like an alert would do.

note: async + await is built on top of promises, it is not something seperate.

```
function breath(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('too small of a value');
    }
    setTimeout(() => resolve(`${amount} ms done`), amount);
  })
}

async function go() {
  console.log('start...');
  await breath(1000);
  console.log('end')
}

go();

```

In console you will see output of 'start...' followed by 'end' after what seems to be a brief pause, which is the setTimeout of 1sec.

Note 1: `await` cannot be used top-level, you'd get an error in console, such as `SyntaxError: await is only valid in async functions and async generators`

Note 2: No callback nightmare, no chaining of `.then()`s, no scoping introduced (all one level).

```
function breath(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('too small of a value');
    }
    setTimeout(() => resolve(`${amount} ms done`), amount);
  })
}

async function go() {
  console.log('start...');
  const res = await breath(1000);
  console.log(res);
  const res2 = await breath(5000);
  console.log(res2);
  const res3 = await breath(500);
  console.log(res3);
  console.log('end')
}

go();

```

capture value function returns^ displaying amount it took to be done, below is example console output of values resolved from promise function^

```
start...
1000 ms done
5000 ms done
500 ms done
end

```

if `await` was to be removed it would return a promise, but having `await` in front of the promise breath will return promise and put out a sort of notice to hold on for a few seconds to wait for (in this case) breath function to resolve or reject.

### error handling

```
function breath(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('too small of a value');
    }
    setTimeout(() => resolve(`${amount} ms done`), amount);
  })
}

async function go() {
  try {
    console.log('start...');
    const res = await breath(1000);
    console.log(res);
    const res2 = await breath(5000);
    console.log(res2);
    const res3 = await breath(300);
    console.log(res3);
    console.log('end');
  } catch(err) {
    console.error(Error(`oh snap: ${err}`));
  }
}

go();

```

^which will run as before, but w/ an amount to changed to < 500, we `catch` the error.

high order function route: _what is a high order function?_ a function that takes in a function as an argument and returns a new function

```
function breath(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('too small of a value');
    }
    setTimeout(() => resolve(`${amount} ms done`), amount);
  })
 }

// fn is any function, such as something like -> .map(function(){ })
function catchErrors(fn) {
  return function() {
    return fn().catch((err) => {
      console.error(Error(`whoooa -> ${err}`))
    });
  }
}

async function go() {
  console.log('start...');
  const res = await breath(1000);
  console.log(res);
  const res2 = await breath(5000);
  console.log(res2);
  const res3 = await breath(300);
  console.log(res3);
  console.log('end');
}

// go(); instead of this
const wrappedFn = catchErrors(go);

wrappedFn();

```

a high order function would stream lines catching multiple errors by wrapping into another function that would act as a catch all

breaking it down:
a function `catchErrors` that returns another function that then returns a function that runs with a catch tacked on the end.

running `wrappedFn();` is not running `go`, instead we've wrapped `go` in `catchErrors` that outputs brand new function `wrappedFn`

_what about if `go` took an argument?_

```
function breath(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('too small of a value');
    }
    setTimeout(() => resolve(`${amount} ms done`), amount);
  })
}

// fn is any function, such as something like -> .map(function(){ })
function catchErrors(fn) {
  return function() {
    return fn().catch((err) => {
      console.error(Error(`whoooa -> ${err}`))
    });
  }
}

async function go(name) {
  console.log(`${name}, starting...`);
  const res = await breath(1000);
  console.log(res);
  const res2 = await breath(5000);
  console.log(res2);
  const res3 = await breath(300);
  console.log(res3);
  console.log('end');
}

// go(); instead of this
const wrappedFn = catchErrors(go);

wrappedFn('jo');

```

as is^ will not work, name will be undefined. Although, putting `name` as argument in the returns functions in `catchErrors` would output correctly it is not an efficient/ flexible option. Instead, using `...rest` and `...spread` would keep it flexible as it would take whatever amount of arguments one would decide to use

```
function catchErrors(fn) {
  return function(...args) {
    return fn(...args).catch((err) => {
      console.error(Error(`whoooa -> ${err}`))
    });
  }
}

```

using rest `...args` in first returned function captures all arguments in an array. Then, with spread `...args` in second return to spread all arguments into that function.

put together (with added argument to show flexibility):

```
function breath(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject('too small of a value');
    }
    setTimeout(() => resolve(`${amount} ms done`), amount);
  })
}

// fn is any function, such as something like -> .map(function(){ })
function catchErrors(fn) {
  return function(...args) {
    return fn(...args).catch((err) => {
      console.error(Error(`whoooa -> ${err}`))
    });
  }
}

async function go(name1, name2, name3) {
  console.log(`Hey, ${name1}, ${name2}, ${name3}! It's starting...`);
  const res = await breath(1000);
  console.log(res);
  const res2 = await breath(5000);
  console.log(res2);
  const res3 = await breath(300);
  console.log(res3);
  console.log('end');
}

// go(); instead of this
const wrappedFn = catchErrors(go);

wrappedFn('jo', 'enigma', 'scrappy');

```

1 arg, 3 or whatever... doesn't matter. The rest and spread adjust to the number of arg without having to adjust the catchErrors function with those same number of args and THAT... is pretty damn awesome :D

Note: as snazzy as this was it shouldn't be something used ALL the time because there are cases where you would want to catch the errors inside your function to specifically handle it a certain way.

ex: catching a form validation error would be handled differently than when encountering another type of error.

above snippet/example is good for use case where you want to handle all errors in similar fashion w/o multiple try/catch errors.

### waiting on multiple promises

```
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
}

go();

```

we wont store the return results, but the promises (p1 + p2)

```
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
  const res = await Promise.all([p1, p2]);
  console.log(res);
}

go();

```

`Promise.all()` combines both promises into one, not resolving itself until both come back.

Note: don't forget to add `await` in front of `Promise.all`, if no `await` console output will be `Promise { <state>: "pending" }`

what will return is not the end user data, it will look something like this

```
0: Response { type: "cors", url: "https://api.github.com/users/wesbos", redirected: false, … }
​
1: Response { type: "cors", url: "https://api.github.com/users/stolinski", redirected: false, … }
​
length: 2

```

Note: using fetch requires a kind of 2-step process; first fetch data, then convert to JSON which returns another promise.

```
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos').then(res => res.json());
  const p2 = fetch('https://api.github.com/users/stolinski').then(res => res.json());
  const res = await Promise.all([p1, p2]);
  console.log(res);
}

go();

```

adding the `then()` to convert each response into json returns an array of data, such as:

```
0: Object { login: "wesbos", id: 176013, avatar_url: "https://avatars2.githubusercontent.com/u/176013?v=4", … }
​
1: Object { login: "stolinski", id: 669383, avatar_url: "https://avatars1.githubusercontent.com/u/669383?v=4", … }
​
length: 2

```

another way to convert to JSON, instead of attaching `then()` 2x...

```
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
  const res = await Promise.all([p1, p2]);
  const packagedPromises = res.map(r => r.json());
  const packagedData = await Promise.all(packagedPromises);
  console.log(packagedData);
}

go();

```

...is to package the promises (`packagePromises`) put into `res` variable by mapping over them and then do another `Promise.all()` that will store all json data into `packagedData` variable. Then, `packagedData` should output same array of data spit out in previous example when attaching `then()` to each fetch.

to seperate data output, destructure!

```
async function go() {
  const p1 = fetch('https://api.github.com/users/wesbos');
  const p2 = fetch('https://api.github.com/users/stolinski');
  const res = await Promise.all([p1, p2]);
  const packagedPromises = res.map(r => r.json());
  const [person1, person2] = await Promise.all(packagedPromises);
  console.log(person1, person2);
}

go();

```

the difference:

```
(2) […]
​
0: Object { login: "wesbos", id: 176013, avatar_url: "https://avatars2.githubusercontent.com/u/176013?v=4", … }
​
1: Object { login: "stolinski", id: 669383, avatar_url: "https://avatars1.githubusercontent.com/u/669383?v=4", … }
​
length: 2
​
<prototype>: Array []

```

no destructure^

vs.

```
Object { login: "wesbos", id: 176013, avatar_url: "https://avatars2.githubusercontent.com/u/176013?v=4", gravatar_id: "", url: "https://api.github.com/users/wesbos", html_url: "https://github.com/wesbos", followers_url: "https://api.github.com/users/wesbos/followers", following_url: "https://api.github.com/users/wesbos/following{/other_user}", gists_url: "https://api.github.com/users/wesbos/gists{/gist_id}", starred_url: "https://api.github.com/users/wesbos/starred{/owner}{/repo}", … }

Object { login: "stolinski", id: 669383, avatar_url: "https://avatars1.githubusercontent.com/u/669383?v=4", gravatar_id: "", url: "https://api.github.com/users/stolinski", html_url: "https://github.com/stolinski", followers_url: "https://api.github.com/users/stolinski/followers", following_url: "https://api.github.com/users/stolinski/following{/other_user}", gists_url: "https://api.github.com/users/stolinski/gists{/gist_id}", starred_url: "https://api.github.com/users/stolinski/starred{/owner}{/repo}", … }
```

destructure^

the destructure option comes in handy when doing ajax requests

```
async function snagDeets(names) {
  const promises = names.map(name => fetch(`https://api.github.com/users/${name}`).then(res => res.json()));
  const [deets1, deets2] = await Promise.all(promises);
  console.log(deets1, deets2);

}

snagDeets(['wesbos', 'stolinski']);

```

console output gist:

```
Object { login: "wesbos", id: 176013, avatar_url: "https://avatars2.githubusercontent.com/u/176013?v=4", gravatar_id: "", url: "https://api.github.com/users/wesbos", html_url: "https://github.com/wesbos", followers_url: "https://api.github.com/users/wesbos/followers", following_url: "https://api.github.com/users/wesbos/following{/other_user}", gists_url: "https://api.github.com/users/wesbos/gists{/gist_id}", starred_url: "https://api.github.com/users/wesbos/starred{/owner}{/repo}", … }

Object { login: "stolinski", id: 669383, avatar_url: "https://avatars1.githubusercontent.com/u/669383?v=4", gravatar_id: "", url: "https://api.github.com/users/stolinski", html_url: "https://github.com/stolinski", followers_url: "https://api.github.com/users/stolinski/followers", following_url: "https://api.github.com/users/stolinski/following{/other_user}", gists_url: "https://api.github.com/users/stolinski/gists{/gist_id}", starred_url: "https://api.github.com/users/stolinski/starred{/owner}{/repo}", … }

```

or leave it as array if number of args being passed may not be a set number

```
async function snagDeets(names) {
  const promises = names.map(name => fetch(`https://api.github.com/users/${name}`).then(res => res.json()));
  const deets = await Promise.all(promises);
  console.log(deets);

}

snagDeets(['wesbos', 'stolinski', 'freecodecamp']);

```

console output gist:

```
[…]
​
  0: Object { login: "wesbos", id: 176013, avatar_url: "https://avatars2.githubusercontent.com/u/176013?v=4", … }
  ​
  1: Object { login: "stolinski", id: 669383, avatar_url: "https://avatars1.githubusercontent.com/u/669383?v=4", … }
  ​
  2: Object { login: "freeCodeCamp", id: 9892522, avatar_url: "https://avatars0.githubusercontent.com/u/9892522?v=4", … }
  ​
  length: 3
  ​
  <prototype>: Array []

```

looking in network tab shows 3 GET requests

Note: a lot can be done with async/await/Promise.all in conjuction with map, reduce and all those snazzy methods

Random note that may or may not be useful out in the world-- `Promise.race()`-- multi-requests, resolving upon return of fastest promise from array of promises that come back.

### callback based function promises

Reality: still alot of callback based JS, like native browser APIs/ existing libraries so using async/await/promises may not always be possible.

Some libraries are changing where they both return promises/accept callback for older legacy code, but if in only callback land and want to use promises... in comes 'promisifying' functions. Note: Although there are libraries out in the world that will do this for you, DIY is pretty simple.

ex: older type API, uses callback based function

```
navigator.geolocation.getCurrentPosition(function(pos) {
  console.log('it worked!');
  console.log(pos);
}, function(err) {
  console.log('it failed');
  console.log(err);
});

```

ex: promisify

```
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

async function go() {
  console.log('starting...');
  const position = await getCurrentPosition();
  console.log(position);
  console.log('finished');
}

go();

```

console.log(s) of starting/finished shows await in action^

taking arguments, ex: accuracy depending on battery life user has

```
function getCurrentPosition(...args) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(...args, resolve, reject);
  })
}

async function go() {
  console.log('starting...');

  // now if await getCurrentPosition() was to get passed options object, spread/rest will take care of those
  const position = await getCurrentPosition();
  console.log(position);
  console.log('finished');
}

go();

```

promisifying w/o library^

to use library, check out [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) or if using node there's a built in utility on the util package that comes baked in w/ Node.
