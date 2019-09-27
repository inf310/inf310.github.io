# React patterns

---

### Passing down elements

```jsx
  function App(props) {
    const userProfile = (
      <a href={props.userProfileLink}>
        <img src={props.userAvatar} alt={props.userName} />
      </a>
    );

    return (
      <div>
        <Header userProfile={userProfile} />
        <Content userProfile={userProfile} />
        <Footer userProfile={userProfile} />
      </div>
    );
  }
```

---

## React clone element

If you really need to change the props of a given element
** This can make you app slow**

```jsx
  const Header = ({ userProfile }) => {
    const profileWithAlternativeLink = React.cloneElement(
      userProfile, { userProfileLink: '/an/alternative/url' }
    );

    return (
      <div>
        Original profile: {userProfile}
        Alternative link: {profileWithAlternativeLink}
      </div>
    );
  };
```

---

### Passing down functions

Allowing children to control the parent's state

```jsx
  function FormWizard() {
    const [step, setStep] = useState(0);
    const [isEnabled, setEnabled] = useState(true);
    const nextStep = useCallback(() => setStep(stp => stp + 1));

    return (
      <div>
        <div>You are at step {step} out of 2</div>
        <FirstStep onValidation={setEnabled} />
        <SecondStep onValidation={setEnabled} />
        <Button onClick={nextStep} enabled={isEnabled}>Next</Button>
      </div>
    );
  }
```

---

## Higher Order Components (HOC)

Passing a component as a prop to another component

- Decoration / mix-in Pattern
- Template method / strategy pattern
- Render props / callback pattern

---

### Decorating Components
Extending component's functionality by wrapping them in HOCs

```jsx
  const LoadingButton = withLoading(MyButton);

  const ThemedLoadingButton = withTheme(LoadingButton);

  const DisapearingThemedLoadingButton = withTransition(
    { fadeOut: 1000 },
    ThemedLoadingButton
  );
```

---

### Template Components
HOC controls rendering. Your component must fit its interface

```jsx
  // display the component if the path matches
  <Route path="/dashboard" component={Dashboard} />

  // use listItem to render each list element
  <ListView listItem={MyItem} />

  // show loading, fetch data
  // then render display with the data
  <DataFetcher
    url="/data.json"
    loading={Loading}
    display={Graph}
  />
```

---

### Render Props
HOC provides data to a callback. You control rendering

```jsx
  <DataFetcher
    url="/data.json"
    render={data => <Graph data={data} />}
  />

  <MyContext.Consumer>
    {contextValue => <h1>{contextValue}</h1>}
  </MyContext.Consumer>

  <Route path="/dashboard">
    <Dashboard />
  </Route>
```

---

## Dynamically loading components

- Lazy loading
- Fullstack components
- Atomic but composable UIs

---

### Loadable HOC
Loading a component then rendering it

```jsx
  import Loadable from 'react-loadable';

  const LoadableComponent = Loadable({
    loader: () => import('./myCoolComponent'),
    loading: () => 'Loading...'
  });

  <LoadableComponent data={42} />
```

---

### Conditional Loading
Dynamically select which component gets loaded

```jsx
  const DataView = Loadable({
    loader: () => (appConfig.view === 'graph'
      ? import('./graphView')
      : import('./tableView')
  })

  <DataView data={data} />
```

---

### Fullstack Components
The server renders the component. Client-side props used as server-side params.

```jsx
  const UserProfile = Loadable({
    loader: ({ id }) => componentRegistry.fetch({
      name: 'user-profile',
      version: 'latest',
      params: { id }
    })
  })

  <UserProfile id="usr-7245" />
```

---

## React lazy and suspense

```jsx
  import React, { Suspense } from 'React';
  import MyErrorHandler from './MyErrorHandler';
  const LazyComponentA = React.lazy(() => import('./ComponentA'));
  const LazyComponentB = React.lazy(() => import('./ComponentB'));

  const MyComponent = () => (
    <MyErrorHandler>
      <Suspense fallback={<div>Loading...</div>}>
          <LazyComponentA />
          <LazyComponentB />
      </Suspense>
    </MyErrorHandler>
  );
```

---

## Questions?
