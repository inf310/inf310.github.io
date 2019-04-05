# The Fetch API

`fetch` is naturally available in the browser

In Node.js it is available as `node-fetch`
---

## Making GET requests

```jsx
  fetch(URL)
    .then(response => response.json())
    .then(data => useTheData(data))
    .catch(error => handleError(error));

  fetch(URL)
    .then(response => response.text())
    .catch(error => handleErrorAndDefault(error))
    .then(dataOrDefault => useTheData(dataOrDefault));
```

---

## Making POST requests

```jsx
  fetch(URL, { method: 'POST', body: JSON.stringify(data) })
    .then(response => {
      if (response.ok) { console.log('The server received the data'); }
      else { console.error('Something went wrong!'); }
    }).catch(error => {
      console.error('Something went wrong!');
    });
```

---

## Making requests in React

Request the user when the component loads

```jsx
  class UserProfile extends React.Component {
    state = { loading: true };
    componentDidMount() {
      fetch(`/users/${props.userId}`)
        .then(userData => this.setState({ loading: false, userData }))
        .catch(error => this.setState({ loading: false, error }));
    }
    render() {
      if (this.state.error) { return <Error msg={this.state.error} />;}
      if (this.state.loading) { return <Loader />; }
      return <UserProfile user={this.state.userData} />;
    }
  }
```

---

## Making requests with hooks

Request the user when the `userId` changes

```jsx
  const initialState = { loading: true };

  const UserProfile = ({ userId }) => {
    const [state, dispatch] = useReducer(handleResponse, initialState);

    useEffect(() => makeRequest(userId, dispatch), [userId]);

    if (state.error) { return <Error msg={this.state.error} />;}
    if (state.loading) { return <Loader />; }
    return <UserProfile user={state.data} />;
  };
```

---

### Request maker / Response reducer

```js
  const makeRequest = (userId, dispatch) => {
    dispatch('LOADING');
    fetch(`/users/${userId}`)
      .then(data => dispatch({ status: 'SUCCESS', payload: data }))
      .catch(error => dispatch({ status: 'ERROR', payload: error }));
  };

  const handleResponse = (state, { status, payload }) => {
    switch (status) {
      case 'LOADING': return { loading: true };
      case 'SUCCESS': return { loading: false, data: payload };
      case 'ERROR': return { loading: false, error: payload };
    }
  };
```

---

## Making requests in Express

-- bash --
```bash
  npm install node-fetch
```
-- api.js --
```js
  const fetch = require('node-fetch');
  // ...
  api.get('/latestCommit/:userName', (req, res) => {
    const userName = req.params.userName;
    fetch(`https://api.github.com/users/${userName}/events`)
      .then(data => res.json(data[0]))
      .catch(error => res.status(500).json(error));
  });
```

---

## Questions?
