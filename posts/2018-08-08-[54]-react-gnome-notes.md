---
title: "React Gnome Notes"
date: "2018-08-08"
---

The inner struggle of whether to jump on Angular, Vue or React has finally ceased. React won and now that I'm playing with it, I get it. It's definitely cool.

As I made my way through the [docs](https://reactjs.org/docs/getting-started.html) and other sources I wrote notes on whatever I had at hand, but that's not very helpful to future me so here I am transferring notes.

# Building Components

You can define components as classes or functions. To define a React component class, you need to extend React.Component (as shown below)

```
class NameOfClassGoesHere extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="whateverClassNameHere">
				<h1>check me out my React Component self!</h1>
			</div>
		);
	}
}

ReactDOM.render(<NameOfClassGoesHere/>, document.getElementById('whateverIdGoesHere'));

```

When building a class component, you include a `contructor` and call `super` within that. Both passing 'props' as an argument. Reason being `this.props` would be undefined.

Note: If there's no state to initialize or methods to bind, no need to implement a contructor.

_why does return have parenthesis?_
Without it return would be empty. JS would insert a semicolon, something like `return;` voiding all the html goodness that followed.

If, the first line, div, would be placed to follow the return it would return as expected however it wouldn't be as visually organized/ appealing. There's something about having tags vertically align that brings some sort of order/peace.

Hence, the use of parenthesis. It's like a "hey don't return yet because there's a block of code incoming"

_Does it all have to be JSX?_
Normal JavaScript can be written, between render and return.

_What's up with that ReactDOM.render()?_
It takes 2 args; component and then where it should render to.

## pass props; stateless functional component

Passing information from parent to child.

```
const CurrentDate = (props) => {
	return(
		<div>
			<p>Current Date is: {props.date}</p>
		</div>
	);
}

class Calendar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h1>What time is it?</h1>
				<CurrentDate date={Date()}/>
			</div>
		);
	}
}

```

The component of `<CurrentDate />` is being rendered by parent class `Calendar`. Within that `<CurrentDate />` there is a property/attribute `date`, `<CurrentDate date={Date()}/>`

Note: The the curly brackets/braces are needed for JavaScript in React. Or, for inline CSS, 2 sets.

That attribute/property will be returned from CurrentDate `{props.date}`

## passing arrays as props

```
const list = (props) => {
	return <p>{props.tasks.join(', ')}</p>
}

class Todo extends React.component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h1>ToDo</h1>
				<h2>today:</h2>
				<list tasks={['walk dog', gym]}/>
			</div>
		);
	}
}

// output: walk dog, gym
```

## fallback prop, default

You can leave it blank or put a default.

ex:

```
MyComponent.defaultProps = {
	location: 'Springfield'
}

```

defaultProps can be overridden by explicit reassignment.

## propTypes

propTypes define props expected.

ex:

```
Items.propTypes = {
	quantity: PropTypes.number.isRequired
}

```

This checks quantity is a number and requires it.

Note: PropTypes needs to be imported (React v15.5.0+), ex: throw `import PropTypes from 'prop-types'` at the top of your script.

Keep in mind React has a few differences like with `className`, types like function and boolean are written `func` and `bool`.

## passing props to es6 class component rather than stateless functional component

parent still gets prop as before, but when retrieving add `this`

parent: `<ReturnTempPW tempPw={'pw'} />`
child: `{this.props.tempPw}`

## some terminology

stateless functional component: any function which accepts props and returns JSX

stateless component: class that extends React.Component, but doesn't use internal state.

stateful component: component that maintains own internal state (also referred to as components/react components)

_what is state?_
state is data your app needs to know about

## stateful components

```
class StatefulComponent extends React.Component {
	constructor(props) {
		super(props);

		// initializes state
		this.state = {
			name: 'jo'
		}
	}

	render() {
		return(
			<div>
				<h1>{this.state.name}</h1>
			</div>
		);
	}
}

```
