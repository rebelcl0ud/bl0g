---
title: "ES6 Status - Classes"
date: "2018-05-06"
---

Prototypal Inheritance

```
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

const scrappy = new Dog('Scrappy', 'mix')

```

Note: Dog is capitilized because it is a constructor.

_What is protypal inheritance?_ When you put a method on the original constructor it will be inherited.

Example: when you create an array, `const turtles = [leo, raph, donnie, mikey]` turles will now have methods available to use, such as `join()`

_Where did that come from?_ `Array`, queen bee, that if you look inside contains a multitude of prototype methods. Which means when you create an array every instance created inherits those methods.

Or, like above example you create a dog, from Dog (which in this case would be the queen bee)

Note: they don't take their own, but share

```
Dog.prototype.bark = function() {
  console.log(`Rrrrruufffff! I'm ${this.name}`);
}

```

typing `scrappy.bark()` should output `Rrrrruufffff! I'm Scrappy` in console.

Now, making 2nd dog...
`const enigma = new Dog('Enigma', 'Lab mix')`

return `Rrrrruufffff! I'm Enigma` in console using bark method as well `enigma.bark()`

In other words, the bark method which was added to queen bee Dog is inherited by every instance created like with scrappy and enigma example above.

Note: - you are able to override methods such as bark even after creating the instance - you can add another method to prototype after creating instance - when you console.log an instance, ex: scrappy, opening it up in console you'll see name and breed, which are specific to the instance, but to see prototype methods-- those are located under proto which are inherited methods from parent, they are not part of the actual object of scrappy itself.

### classes

```
// taken from prototype ex ^there

function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

Dog.prototype.bark = function() {
  console.log(`Rrrrruufffff! I'm ${this.name}`);
}

Dog.prototype.nap = function() {
  console.log('ZzZzZzz');
}

const scrappy = new Dog('Scrappy', 'mix')
const enigma = new Dog('Enigma', 'Lab mix')
```

There are 2 ways to create classes, class declaration and class expression.

class declaration:

```
class Dog {

}

```

class expression:

```
const Dog = class {

}

```

Inside the body of a class are methods. The only method required is a constructor. That is what happens when you create a new version.

```
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    console.log(`Rrrrruufffff! I'm ${this.name}`);
  }

  nap() {
    console.log('ZzZzZzz');
  }

  get description() {
    return `${this.name} is a ${this.breed}`
  }

  set nicknames(value) {
    this.nn = value.trim();
  }

  get nicknames() {
    return this.nn;
  }
}

```

Note: when adding methods inside a class, do not put commas to seperate as with properties in objects.

static method:

`Array.of()`, `of()` only lives on Array itself/directly... meaning it is not inherited. So, if you would have an array of `toys = [legos, barbies, puzzles]` you would not be able to do something like `toys.of`

In similiar fashion,
adding `static info() { console.log('Dogs are known to be more dependent on humans than cats.') }` to Dog.

To grab info, would be from Dog itself, not through an instance like scrappy or enigma. `Dog.info()` will return the static method.

Note: you can use getters and setters like you would use on objects.

getter: `scrappy.description()` in console should return `Scrappy is a mix` -- not a method, but property.

setter: `nicknames(values)` cannot use same name for variable^, also need getter to recall nickname.

```
scrappy.nicknames = '   scraps ';
// will console.log "   scraps "

scrappy.nicknames
// will console.log "scraps"

```

### extending classes + using super()

```
class Animal() {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.hungry = [];
  }

  drink() {
    this.thirst -= 10;
    return this.thirst;
  }

  eat(food) {
    this.hungry.push(food);
    return this.hungry;
  }
}

```

Above class can fit any type of animal.

`const goat = new Animal('stardust');`

goat in console should output name, thirst meter, and hunger as in above constructor.

```
// console example

> goat

  Animal {name: "stardust", thirst: 100, hungry: Array[0]}

```

with `goat.eat` you can add to stomach--
`goat.eat('grass');`

and `goat.drink()` will reduce thirst by 10

Although, Animal works for most animals what were to happen if we wanted a dog-- dogs bark. We can _extend_ Animal. Initial thought would be something as follows:

```
class Dog extends Animal {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}

```

`const enigma = new Dog('Enigma', 'Lab mix');`

The above however will return an error, `this` is undefined.

_why?_ Dog is an extension of Animal, which means Animal would need to be created first before layering in additional behavior and such like we would be doing with Dog.

_how?_ by calling `super`

```
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log('bark bark bark');
  }
}

```

`super()` is like calling `Animal()`, essentially it calls whatever you're extending. Since Animal contains name, `this.name` in Dog is not needed, instead it is added as param in super, `super(name)`

Now, when `console.log`-ing enigma, output should contain (inheriting) all of Animal and the breed added through Dog.

Of course, able to add methods, such as `bark()` as in previous section of notes.

Note: prob good idea to not go extend/super crazy, which would make sense, I can imagine it would not be reader-friendly with like 10 of those things. #realtalk

### extending arrays w/ classes

creating a custom collection:

```
// class to create new instance from, extends from Array
// when something extends you first have to create what you are extending first, calling super within constructor

class MovieCollection extends Array {
  // name of list, and the rest of the items- ex: name, stars
  constructor(name, ...items) {
    // in this case it is like calling new Array
    // items as is will create an array within array
    // using ...spread, will put each item in- spread into array
    // items is an array, but we want super to have each item passed as argument
    super(...items);
    this.name = name;
  }
}
const movies = new MovieCollection('MyList',
  { name: 'Hackers', stars: 5 },
  { name: 'Saturday Night Fever', stars: 5 },
  { name: 'Death Note, live action', stars: 2 },
  { name: 'Aladdin', stars: 5 },
  { name: 'Little Nicky', stars: 2 }
);

```

adding methods:

```
class MovieCollection extends Array {

  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }

  add(movie) {
    this.push(movie);
  }


}
const movies = new MovieCollection('Random',
  { name: 'Hackers', stars: 5 },
  { name: 'Saturday Night Fever', stars: 5 },
  { name: 'Death Note, live action', stars: 2 },
  { name: 'Aladdin', stars: 5 },
  { name: 'Little Nicky', stars: 2 }
);

movies.add({ name: 'Jason X', stars: 1});

```

Note:

- using `for in` will loop over/output index 0-5 and name, which is property given

```
for(const movie in movies) {
  console.log(movie);
}

// console output
0 -> hackers
1 -> saturday night fever
2 -> death note, live action
3 -> aladdin
4 -> little nicky
5 -> jason x
name -> property name
```

Note:

- using `for of` iterates over iterable properties of an object, you dont get the property 'name' but objects themselves (not just key)
- you can add properties, but iterate over just objects using this type of for loop

```
for(const movie of movies) {
  console.log(movie);
}

// console output
Object { name: "Hackers", stars: 5 }
Object { name: "Saturday Night Fever", stars: 5 }
Object { name: "Death Note, live action", stars: 2 }
Object { name: "Aladdin", stars: 5 }
Object { name: "Little Nicky", stars: 2 }
Object { name: "Jason X", stars: 1 }

```

adding another method, sort:

```
sortIt(limit=10) {
  return this.sort((a,b) => (a.stars > b.stars ? -1 : 1)).slice(0,limit)
}

```

will sort by star ratings w/ a default limit of 10 movies

```
movies.sortIt()

// console output
(6) […]
​
0: Object { name: "Aladdin", stars: 5 }
​
1: Object { name: "Saturday Night Fever", stars: 5 }
​
2: Object { name: "Hackers", stars: 5 }
​
3: Object { name: "Little Nicky", stars: 2 }
​
4: Object { name: "Death Note, live action", stars: 2 }
​
5: Object { name: "Jason X", stars: 1 }
​
length: 6
​
name: 6

```

can also specify number, like top 3. ex: `movies.sortIt(3)`

Note: you can extend any of the native stuff built into JavaScript like above Array ex
