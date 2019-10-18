(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{887:function(n,e){n.exports="# The Fetch API\n\n`fetch` is naturally available in the browser\n\nIn Node.js it is available as `node-fetch`\n---\n\n## Making GET requests\n\n```jsx\n  fetch(URL)\n    .then(response => response.json())\n    .then(data => useTheData(data))\n    .catch(error => handleError(error));\n\n  fetch(URL)\n    .then(response => response.text())\n    .catch(error => handleErrorAndDefault(error))\n    .then(dataOrDefault => useTheData(dataOrDefault));\n```\n\n---\n\n## Making POST requests\n\n```jsx\n  fetch(URL, { method: 'POST', body: JSON.stringify(data) })\n    .then(response => {\n      if (response.ok) { console.log('The server received the data'); }\n      else { console.error('Something went wrong!'); }\n    }).catch(error => {\n      console.error('Something went wrong!');\n    });\n```\n\n---\n\n## Making requests in React\n\nRequest the user when the component loads\n\n```jsx\n  class UserProfile extends React.Component {\n    state = { loading: true };\n    componentDidMount() {\n      fetch(`/users/${props.userId}`)\n        .then(userData => this.setState({ loading: false, userData }))\n        .catch(error => this.setState({ loading: false, error }));\n    }\n    render() {\n      if (this.state.error) { return <Error msg={this.state.error} />;}\n      if (this.state.loading) { return <Loader />; }\n      return <UserDetails user={this.state.userData} />;\n    }\n  }\n```\n\n---\n\n## Making requests with hooks\n\nRequest the user when the `userId` changes\n\n```jsx\n  const initialState = { loading: true };\n\n  const UserProfile = ({ userId }) => {\n    const [state, dispatch] = useReducer(handleResponse, initialState);\n\n    useEffect(() => makeRequest(userId, dispatch), [userId]);\n\n    if (state.error) { return <Error msg={this.state.error} />;}\n    if (state.loading) { return <Loader />; }\n    return <UserDetails user={state.data} />;\n  };\n```\n\n---\n\n### Request maker / Response reducer\n\n```js\n  const makeRequest = (userId, dispatch) => {\n    dispatch({ status: 'LOADING' });\n    fetch(`/users/${userId}`)\n      .then(data => dispatch({ status: 'SUCCESS', payload: data }))\n      .catch(error => dispatch({ status: 'ERROR', payload: error }));\n  };\n\n  const handleResponse = (state, { status, payload }) => {\n    switch (status) {\n      case 'LOADING': return { loading: true };\n      case 'SUCCESS': return { loading: false, data: payload };\n      case 'ERROR': return { loading: false, error: payload };\n    }\n  };\n```\n\n---\n\n## Making requests in Express\n\n-- bash --\n```bash\n  npm install node-fetch\n```\n-- api.js --\n```js\n  const fetch = require('node-fetch');\n  // ...\n  api.get('/latestCommit/:userName', (req, res) => {\n    const userName = req.params.userName;\n    fetch(`https://api.github.com/users/${userName}/events`)\n      .then(data => res.json(data[0]))\n      .catch(error => res.status(500).json(error));\n  });\n```\n\n---\n\n## Combining results\n\n```js\n  Promise.all([fetch(url1), fetch(url2)])\n    .then([res1, res2] => Promise.all([res1.json(), res2.json()]))\n    .then([data1, data2] => doStuffWithData(data1, data2));\n```\n-- or --\n```js\n  Promise.all([\n    fetch(url1).then(res1 => res.json()),\n    fetch(url2).then(res2 => res.json())\n  ]).then([data1, data2] => doStuffWithData(data1, data2));\n```\n\n---\n\n## Fetching redundancy\n\n```js\n  Promise.race([\n    fetch(fromServer1)\n    fetch(fromServer2)\n  ]).then(response => response.json())\n    .then(data => doStuffWithData(data));\n```\n\n---\n\n## Questions?\n"}}]);
//# sourceMappingURL=7.fbec0250.chunk.js.map