---
title: "Angular PlayTest"
date: "2018-03-12"
---

My focus has pretty much stayed within the vanilla realm, but I've been wanting to try out some JS frameworks to get a little bit of a feel for them.

I did try Ember during Code School's free weekend. Unfortunately, I did come across that news a little late so I wasn't able to get too far, but I did find it interesting. My plan is to go test it out on brief little app and document as I go as I did with Angular.

Below is my documentation as I went through different steps... I see why people like it, but I also see I barely scratched the surface of what Angular is capable of.

## angular setup

`npm install @angular/cli -g`

I have a vagrant setup so I ran above code within vagrant folder using command line from within environment.

`ng -v` will check for Angular, if present Angular CLI welcome message will appear in terminal. Using terminal mentioned above it shows a successful install, however if that same command were run outside of that terminal ex: /vagrant-js folder you'll get 'command not found'

## creating project

At this point, make sure you're in correct folder to create project folder. In my case, it's the `src` folder. Once there, `ng new projectnamehere` will create project.

The above will run for a bit, once done run `ng serve` which reminds me of `rails s`

### project creation error

Initially ran `ng new projectnamehere --style=scss --routing`, but ended up with a few npm errors and project not successfully being created. Removed `--routing` recreated project using `ng new projectnamehere --style=scss` was successful or so it seems.

### ng serve not working

Once I addressed project creation, I expected `ng serve` to serve a welcome message that would make my heart smile... it did not (boooooooo). Looking up this issue, I've found few posts if any-- whatever found is similar, but not exact. From what I gather it seems angular and vagrant do not play nice with each other.

### testing outside vagrant environment

- Checked for angular cli, which was present.
- Created new project using `ng new projectnamehere --style=scss --routing` which was giving me issue within vagrant env, seems to be doing fine so far(status bar is 3/4 done).

Project app successfully created and now for the moment of truth... _drumroll_ localhost shows my angular welcome page. Hmmm...

I think the assumption/expectation would be happiness because it finally works and I'm able to move forward to play around with it, but... I'm kinda not. Why? Well, because I want to be able to set it up within my vagrant env as I have my other projects. I feel that although the vibe I'm getting from surfing the interwebzzz is that it is not possible... a part of me feels I can find a way. Which I will get back on that quest after... because... I'm totally going to play with it right now! :D

## playing with Angular

### components

scripts ending with `.ts` stands for typescript

to create components
`ng generate component nameofcomponenthere` or shorthand `ng g c nameofcomponenthere`

above code reminds me of `rails g controller nameofcontroller` I'm going to have to double check though as I haven't been playing with rails since focusing on frontend and all it entails.

`app component` seems to be the base-- this is where you are able to nest additional components such as `about` or `home` which I created in this particular project.

`routerLink` will allow you to change actual component
`<a routerLink="about"> ABOUT </a>` creates ABOUT link

when looking into components created (ex: home & about) their html pages come with
`<p>about works!</p>`

I like that it comes with some test text.

In this case, when testing out the nesting of components I was able to see the test text show up under the home & about links created letting me know the nesting was successful. Woo!

### templates & styles

templates and style paths are found in `componentnamehere.components.ts`
you are able to write inline code in these areas, but personally it just seems messy to do so even if it is just one line or two. I like the fact things are separated.

With that said, there is a `styles.scss` file where you are able to put global styling while more specific styles go in respective components scss file.

### interpolation, property, and event binding

what makes things functional/ interactive^

interpolation example:
in `home.component.ts` putting property `itemCount: number = 4`-- by going to `home.component.html` and placing `({{ itemCount }})` will show the hardcoded itemCount of 4.

I see similarities in the way `itemCount` is used to pull hardcoded number from typescript file, perhaps it was using Jekyll, liquid or maybe it was when playing with Ember.

property binding example:
`btnText: string = 'add task';` in `home.component.ts`

`<input type="submit" class="btn" [value]="btnText">` in `home.component.html`

vs. initially, `<input type="submit" class="btn" value="add">` or interpolation `<input type="submit" class="btn" value="{{ btnText }}">`

both property and interpolation example are one-way binding

2-way data binding example:
In the case of the todo input, setting and retrieval of value/data from component class would be necessary. `ng model` would create that 2-way data binding. For this to work there needs to be an import of module.

add `import { FormsModule } from '@angular/forms';` into `app.module.ts` as well as under `imports` section.

as mentioned before app files are the basis of the project.

to test this out-- hardcoded item is added in `home.component.ts` under previous examples `goalText: string = 'todo item example';`

adding `<input type="text" class="txt" name="item" placeholder="ToDo..." [(ngModel)]="goalText"><br><span>{{ goalText }}</span>` in form within html file-- comes from component to html template (1 direction atm)

editing text u can see the reverse direction coming from the component class being set by value in input field (2-way data binding)-- capturing user input and communicate to class however, you cant actually add anything yet/ save user submitted data somewhere-- we need event binding

event binding:
captures user initiated events to initiate logic in component class
there are diff types of events, in this example click event is used

`<input type="submit" class="btn" [value]="btnText" (click)="addItem()">` adding click event, uses parenthesis with method call, arg not needed since input using `ngModel` saved in component class.

in `home.component.ts`
`ngOnInit()` gets loaded when app loads

```
  itemCount: number;
  btnText: string = 'add task';
  goalText: string = 'todo item example';
  goals = [];

  constructor() { }

  ngOnInit() {
    this.itemCount = this.goals.length;
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
  }
```

the above shows count of items added, dynamically

however, the actual items do not show yet because we have not edited html file to do so.

```
<div class="col">
  <p class="todo-container" *ngFor="let goal of goals">
    {{ goal }}
  </p>
</div>
```

^above shows items added, matches dynamic count
the `ngFor`, a for loop? using interpolation `{{ goal }}` to iterate through? from pervious `goals` array placed in `home.component.ts`

### animation

adding animation capabilities `npm install @angular/animations@latest --save`

### sidebar

when restarting server, there were some errors-- it turns out I was missing a comma where imports are listed

what's cool is once I fixed the typo the terminal updated without me having to quit/restart the server/console

it actually found another error in spelling and then once I fixed it it updated again... too cool.

### back to animation - adding tasks

after the npm install, we need accessibility so as with `FormsModule` we add `import { BrowserAnimationsModule } from '@angular/platform-browser/animations'` to `app.module.ts` script and then again under `imports` section.

in `home.component.ts` we then import specific types of animation, such as trigger.
`import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'`

to use them you place animation specific functions under `@Component` section

`trigger('')` first arg is name of animation in this case it will be called `goals`

`trigger('goals')` then an array for animation specific functions

```
trigger('goals', [


])
```

after defining animation, add to template `home.component.html` as follows--

`<div class="container color-light" [@goals]="goals.length">` the `@goals` is the name of animation

NOTE: alot of the animation seems like overkill, good to know as overview

### back to animation - removing tasks

in `home.component.html`--

```
<div class="col">
  <p class="todo-container" *ngFor="let goal of goals; let i = index" (click)="removeItem(i)">
    {{ goal }}
  </p>
</div>
```

in `home.component.ts`--

```
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'add task';
  goalText: string = 'todo item example';
  goals = ['test', 'test2', 'test3'];

  constructor() { }

  ngOnInit() {
    this.itemCount = this.goals.length;
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
  }

  removeItem(i) {
    this.goals.splice(i,1);
  }

}

```

### routing

when creating project `ng new projectnamehere --style=scss --routing`

`--routing` created `app-routing.module.ts` there we import both components created ex: home & about

```
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'

```

where we set paths--

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

```

upon saving and browser refreshing there will be 2 of everything created initially, this is because of the `app.component.html` file where the following line is located `<app-home></app-home>`, removing it will revert to displaying 1 of everything as it was before adding the routing.

clicking on menu links, home & about, are now functional

### routing - retrieval of parameters

`:id` is route parameter

example:

```
{
  path: 'about/:id',
  component: AboutComponent
}

```

for example hardcoding an :id parameter--
`<li><a routerLink="about/32">ABOUT</a></li>`

when clicking on about link it will show hardcoded id parameter in address bar... but how do we retrieve that?

by adding `import { ActivatedRoute } from '@angular/router';` in `about.component` it will give access to route parameters and creating an instance of ActivatedRoute through dependency injection

```
 constructor(private route: ActivatedRoute) {
   this.route.params.subscribe(res => console.log(res.id));
 }

```

^above fetches params showing in console.

Normally there would be a property binded to constructor value and do something with data such as query an api to get data from some db

### component based router navigation

changing router component based on logic occurring in component class

ex: `import { Router } from '@angular/router'` in `about.component`
and make an instance as done with `ActivatedRoute`

```
 constructor(private route: ActivatedRoute, private router: Router) {
  this.route.params.subscribe(res => console.log(res.id));
 }

```

add a method

```
 sendMeHome() {
  this.router.navigate([''])
 }

```

the reason the brackets within parenthesis is empty is due to the empty string in home path in `app-routing.module.ts`

```
<p>
  about works! <a href="" (click)="sendMeHome()"><strong>now, send me back.</strong></a>
</p>

```

This will send you back homepage using above method from `about.component.ts`

### services

in order to access code used in various parts w/o rewriting-- service files are used to share data between components

`ng generate service data` to create service file to share data btwn home and about components

one of the best ways to share data between components is to use `import { BehaviorSubject } from 'rxjs/BehaviorSubject';`

Below is what it would look like--

```
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private goals = new BehaviorSubject<any>(['todo 1', 'todo 2']);

  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.goals.next(goal);
  }

}
```

to use service file, it needs to be imported into `app.module.ts` adding `import { DataService } from './data.service'` and in provider array `providers: [DataService],`

`import { DataService } from '../data.service';` also needs to be added to `home.component.ts` putting two dots at beginning of path since it is within a folder.

needs an instance, which is created through dependency injection... in constructor `constructor(private _data: DataService) { }`

why the underscore?^

then...

```
ngOnInit() {
  this.itemCount = this.goals.length;
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);
}

```

### last thoughts

I'm still annoyed at the fact there seems to be no way to run Angular within Vagrant.

Also, since I have git setup within Vagrant and not on my machine I didn't push up my play test... booooooo!
