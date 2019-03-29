# React context

---

## Passing props

A parent can pass props to its children

```jsx
  const MyThemedApp = props => (
    <div>
      <Header theme={props.theme} />
      <MainContent theme={props.theme} />
      <Footer theme={props.theme} />
    </div>
  );

  const Header = props => (
    <React.Fragment>
      <Logo theme={props.theme} />
      <Tagline theme={props.theme} />
    </React.Fragment>
  );
```

---

## Problems with passing props

it is tedious and also not all components in between care about these values

```jsx
  <App>
    <Header>
      <Logo> {/* <-- actually needs theme */}
    <Content>
      <Article>
        <Button> {/* <-- actually needs theme */}
```

---

## Passing elements down the tree

---

## Context

```jsx
  const ThemeContext = React.createContext('light');

  const MyThemedApp = (props) => (
    <ThemeContext.Provider value={props.theme}>
        <Header />
        <MainContent />
        <Footer />
    </ThemeContext.Provider>
  );

  const LogoInHeader = props => (
    <ThemeContext.Consumer>
      {(theme) => <img src={`/logos/${theme}.png`} />}
    </ThemeContext.Consumer>
  );
```

---

## Context hook

`createContext` and `Provider` are the same, only consuming is done using a hook

```jsx
  const ThemedButton = () => {
    const themeName = React.useContext(ThemeContext);

    return <button className={themeName}>Click here!</button>;
  };
```

---

## Using multiple contexts

```jsx
  const ThemedTranslatedButton = () => {
    const theme = React.useContext(ThemeContext);
    const texts = React.useContext(LanguageContext);

    return (
      <button style={theme.buttonStyles}>
        {texts.buttonText}
      </button>);
  }
```

---

## Complex context values

providing object/array literals will force the entire subtree to re-render

```jsx
  const InefficientContext = () => (
    <MyContext.Provider value={{ x: 0, y: 0 }}>
      <App />
    </MyContext.Provider>
  );

  const originPoint = { x: 0, y: 0 };
  const CoordinatesApp = () => (
    <MyContext.Provider value={originPoint}>
      <App />
    </MyContext.Provider>
  );
```

---

## Dynamic Context

```jsx
  const DynamicThemeContext = React.createContext();

  const DynamicThemeProvider = (props) => {
    const contextState = React.useState(props.initialTheme);
    return (
      <DynamicThemeContext.Provider value={contextState}>
        {props.children}
      </DynamicThemeContext.Provider>
    );
  };

  const ThemeSwitch = () => {
    const [theme, setTheme] = useContext(DynamicThemeContext);
    const changeTheme = () => setTheme(oldTheme =>
      oldTheme === 'light' ? 'dark' : 'light');
    return <button onClick={changeTheme}>Toggle theme</button>;
  };
```

---

## Questions?
