# Forms with React

---

## Focusing an element

Focusing on an element in HTML and JS is imperative

-- `form.html` --
```html
  <input id="first-name" />
```
-- `form.js` --
```js
  const inputNode = document.getElementById('first-name');
  inputNode.focus();
```

---

## React refs (using hooks)

Refs are a way to access imperative APIs

```jsx
  function FocusedInput() {
    const inputRef = React.useRef();
    React.useEffect(() => { inputRef.current.focus(); }, []);

    return <input ref={inputRef} />
  }
```

---

## React refs (using class)

```jsx
  class ClassyFocusedInput extends React.Component {
    constructor() {
      super();
      this.inputRef = React.createRef();
    }

    componentDidMount() {
      this.inputRef.current.focus();
    }

    render() {
      return <input ref={this.inputRef} />
    }
  }
```

---

## Uncontrolled forms

Using a ref to read the data from a field

```jsx
  function SimpleUncontrolledForm() {
    const inputRef = React.useRef();
    const submitForm = () => sendToServer(inputRef.current.value);

    return (
      <div>
        <input ref={inputRef} />
        <button onClick={submitForm}>submit</button>
      </div>
    );
  }
```

---

## Controlled forms

using React state to keep the value of a field

```jsx
  function SimpleControlledForm() {
    const [value, setValue] = React.useState('');
    const onChange = event => setValue(event.target.value);

    return <input value={value} onChange={onChange} />;
  }
```

---

## Features comparison

|  feature | uncontrolled || controlled |
| --- | --- | ---|
| one-time value retrieval |	✅ ||	✅ |
| validating on submit | ✅ || ✅ |
| instant field validation | ❌|| ✅ |
| conditional disabling | ❌ || ✅ |
| several inputs for same data | ❌ || ✅ |
| | | | *[source](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)* |

---

## Hoisting state

```jsx
  function NameInput(props) {
    const [name, setName] = useState(props.savedName);

    const setAndPassToParent = (event) => {
      const value = event.target.value;
      setName(value);
      props.onNameChange(value);
    };

    return (
      <React.Fragment>
        Enter your name:
        <input value={firstName} onChange={setAndPassToParent} />
      </React.Fragment>
    );
  }
```

---

## useReducer

a more powerful version of useState

```jsx
  const initialState = { name: '', age: '' };
  const reducer = (state, { field, value }) => {
    return { ...state, [field]: value };
  }

  const MyForm = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const setField = field => e =>
      dispatch({ field, value: e.target.value });

    return (<form>
      <input value={state.name} onChange={setField('name')} />
      <input value={state.age} onChange={setField('age')} />
    </form>);
  };

```
---

## Questions?
