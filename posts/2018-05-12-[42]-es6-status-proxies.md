---
title: "ES6 Status - Proxies"
date: "2018-05-12"
---

Proxies allow you to override default behavior for many of Object's default operations-- there are a multitude of methods that come as Object default.

`const pup = { name: 'enigma', age: 12 };`

if I wanted to return something other than 'enigma'...

`const pupProxy = new Proxy(object youd like to proxy goes here, { handler goes here- where you specify operations looking to rewrite });`

[Proxy/handler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)

overriding operation/ inside handler is called traps-- what sits between you and object.

```
const pup = { name: 'enigma', age: 12 };
const pupProxy = new Proxy(pup, {

});
```

`pupProxy.name = 'enigmatic';` sets property of name on pupProxy, to trap that from happening-- go in the middle of implementing logic for set.

```
const pup = { name: 'enigma', age: 12 };
const pupProxy = new Proxy(pup, {
  get(target, name) {
    console.log('asking for ', target, name);
  }
});

pupProxy.name = 'enigmatic';

```

console output gist:

```
>>pupProxy
    Proxy
    ​
      <target>: {…}
      ​​
        age: 12
        ​​
        name: "enigmatic"
        ​​
        <prototype>: Object { … }
      ​
      <handler>: {…}
      ​​
        get: get()
        ​​​
          length: 2
          ​​​
          name: "get"
          ​​​
          <prototype>: function ()
          ​​
        <prototype>: Object { … }
>>pupProxy.name
  asking for  Object { name: "enigmatic", age: 12 } name

```

^console.logs entire object and key => name

```
const pup = { name: 'enigma', age: 12 };
const pupProxy = new Proxy(pup, {
  get(target, name) {
    // console.log('asking for ', target, name);
    return 'hijacked'
  }
});

pupProxy.name = 'enigmatic';

```

^return shows example of jumping in the middle of the `get()` possible usage is to modify or checks, such as `toUpperCase()`

```
const pup = { name: 'enigma', age: 12 };
const pupProxy = new Proxy(pup, {
  get(target, name) {
    // console.log('asking for ', target, name);
    return `hijacked`.toUpperCase();
  },
  set(target, name, value) {
    if(typeof value === 'string') {
      target[name] = value.trim();
    }
  }
});

pupProxy.name = 'enigmatic';

```

console output gist, adding set:

`pupProxy.whut = ' check out all this useless space '`

outputs this `" check out all this useless space "`

however, input of `pupProxy` in console outputs `whut` tidy and trimmed as `set` in snippet above^.

```
>>pupProxy
  Proxy
    <target>: {…}
    ​​
      age: 12
      ​​
      name: "enigmatic"
      ​​
      whut: "check out all this useless space"
      ​​
      <prototype>: Object { … }
    ​
    <handler>: Object { … }
```

Note: if you don't specify one of listed traps, [Proxy/handler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler), object default will take over.

### moaaar proxy usage

```
const phoneHandler = {
    set(target, name, value) {
      target[name] = value.match(/[0-9]/g).join('');
    }
  }

  const phoneNumProxy = new Proxy({}, phoneHandler);

```

setting a phone number, no matter input, will remove spaces/dashes and whatnot
ex: `phoneNumProxy.cel = '123-456-7890'` will return `'1234567890'` on `phoneNumProxy.cel` input.

```
const phoneHandler = {
    set(target, name, value) {
      target[name] = value.match(/[0-9]/g).join('');
    },
    get(target, name) {
      return target[name].replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
    }
  }

  const phoneNumProxy = new Proxy({}, phoneHandler);

```

the get will then replace certain characters in such a manner that no matter input, the return of that will be uniform. ex: `"(123)-456-7890"` on `phoneNumProxy.cel`

^ex of set/ get stepping in between proxy, not starting with existing object, but instead passing blank object using that to set values on

### proxy usage to combat errors

```
const safeHandler = {
  // trap the set, only one that matters in this case
  set(target, name, value) {

    // make list of like keys
    // find those that match initial letter case
    const likeKey = Object.keys(target).find(k => k.toLowerCase() === name.toLowerCase())

    if(!(name in target) && likeKey) {
      throw new Error(`seems there already is a(n) ${name} property but with the case of ${likeKey}`)
    }
    target[name] = value;
  }

}

const safety = new Proxy({ id: 100}, safeHandler);

// testing with overriding trying to use different letter case than stated/intended initially, should throw error
safety.ID = 200;

```

^results in `Error: seems there already is a(n) ID property but with the case of id` shown in console upon page refresh

setting: `safety.name = 'jo'` and then trying to reset with `safety.NaMe = 'jo'` will result in similar error^, `Error: seems there already is a(n) NaMe property but with the case of name`

however, doing it the other way around would result in opposite, showing something like `Error: seems there already is a(n) name property but with the case of NaMe` in which case I would assume there would nee to be something to check/prevent that because who the hell would want to look up something with some screwy letter casing, am I right?
