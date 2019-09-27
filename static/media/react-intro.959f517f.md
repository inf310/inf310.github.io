# Intro to React

a JavaScript library for building user interfaces

---

## React Features

- atomic design
- declarative syntax
- one-way data flow
- cross-platform

---

## Atomic Design

- Methodology for creating design systems (as opposed to ad-hoc collections of web pages)
- An equal partnership between design and engineering

---

## Atomic Design: Concepts

|     |     |     |
| --- | --- | --- |
| ![Tokens](/images/react/atomic_design_tokens.png) | ![Atoms](/images/react/atomic_design_atoms.png) | ![Molecules](/images/react/atomic_design_molecules.png) |
| ![Organisms](/images/react/atomic_design_organisms.png) | ![Systems](/images/react/atomic_design_systems.png) | &nbsp; |

---

## Atomic Design: Benefits

- Composability
- Reusability
- Consistency
- Maintainability

---

## Components

a component is a function that returns a React element.

```js
  function Hello(props) {
    return React.createElement(
      'div', null, `Hello, ${props.name}`
    );
  }

  function App() {
    return React.createElement('div', null, [
      React.createElement(Hello, { name: 'everyone' })
    ]);
  }
```

---

## JSX

html-like syntax sugar that transpiles to `React.createElement` calls.

```jsx
  import React from 'react'; // must import React when using JSX

  const Hello = props => <div>Hello {props.name}</div>;

  const HelloWorld = () => <Hello name="World" />;

  const Page = () => (
    <div>
      <HelloWorld />
      <Hello name="everyone" />
    </div>
  );
```

---

## Class components

another way to declare a component is using the JavaScript class syntax

```jsx
  class ClassyHello extends React.Component {
    render() {
      return (
        <div>Hello {this.props.name}</div>
      );
    }
  }
```

---

## Class components with state

until recently using a class component was the only way to access certain React features

```jsx
  class ClassyCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: 0 };
      this.incrementOnClick = () => {
        this.setState(oldState => ({ value: oldState.value + 1 }));
      };
    }

    render() {
      return (<div>
        <span>Value: {this.state.value}</span>
        <button onClick={this.incrementOnClick}>Increment</button>
      </div>);
    }
  }
```

---

## Functional state with hooks

the new hooks API allows multiple class-only features
to be used in functional components

```jsx
  function FunctionalCounter() {
    const [value, setValue] = React.useState(0);
    return (<div>
      <span>Value: {value}</span>
      <button onClick={() => setValue(oldValue => oldValue + 1)}>Increment</button>
    </div>);
  };
```

---

## Component Lifecycle

![Component lifecycle](/images/react/component-lifecycle.jpg)

---

## Unidirectional data flow

Receive action -> Update state -> Update UI

![The flux architecture](/images/react/flux.png)

---

## Rendering Components

React's virtual DOM allows it to render the same
component tree in multiple environments

![cross platform](/images/react/react-fiber-architecture.png)
---

## Rendering in the browser

create real html elements from the react virtual DOM tree  

```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import MyApp from './my-app';

  ReactDOM.render(
    <MyApp />
    document.getElementById('root')
  );
```

---

## Rendering on the server

create an html string that can be sent from the server to browsers

```jsx
  import React from 'react';
  import ReactDOM from 'react-dom/server';
  import MyApp from './my-app';

  const htmlString = ReactDOM.renderToString(<MyApp />);
```

---

## Rendering in tests

creating a JSON object that we can inspect and verify in tests

```jsx
  import TestRenderer from 'react-test-renderer';
  import MyApp from './my-app';

  const testRenderer = TestRenderer.create(<MyApp />);

  console.log(testRenderer.toJSON());
```

---

## Virtual DOM

- diffing
- reconciling
- minimal DOM manipulation

---

## Virtual DOM

![Diffing and reconciling](/images/react/virtualdom.png)

---

## Bootstrapping a project

Create simple zero-configuration applications using a popular template

```bash
  npm install -g create-react-app
  create-react-app my-first-app
  cd my-first-app
  npm run start
```


---

## Links

- [React documentation](https://reactjs.org/)
- [Overreacted - Dan Abramov's blog](https://overreacted.io/)
- [Component lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [create-react-app documentation](https://github.com/facebook/create-react-app)

---

## Questions?
