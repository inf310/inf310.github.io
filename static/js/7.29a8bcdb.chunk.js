(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{888:function(n,e){n.exports="# React context\n\n---\n\n## Passing multiple connected props down the tree\n\n```jsx\n  const MyUserAwareApp = ({ userName, userAvatar }) => (\n    <div>\n      <Header userName={userName} userAvatar={userAvatar} />\n      <MainContent userName={userName} userAvatar={userAvatar} />\n      <Footer userName={userName} userAvatar={userAvatar} />\n    </div>\n  );\n\n  const Header = props => (\n    <Link href={`/users/${props.userName}`} />\n      <Image src={props.userAvatar} />\n    </Link>\n  );\n```\n\n---\n\n## Passing elements down the tree\n\n```jsx\n  const MyUserAwareApp = ({ userName, userAvatar }) => {\n    const userLink = (\n      <Link href={`/users/${props.userName}`} />\n        <Image src={props.userAvatar} />\n      </Link>);\n\n    return <div>\n      <Header userLink={userLink} />\n      <MainContent userLink={userLink} />\n      <Footer userLink={userLink} />\n    </div>\n  };\n```\n\n---\n\n## Passing props deep down the tree\n\n```jsx\n  const MyThemedApp = props => (\n    <div>\n      <Header theme={props.theme} />\n      <MainContent theme={props.theme} />\n      <Footer theme={props.theme} />\n    </div>\n  );\n\n  const Header = props => (\n    <React.Fragment>\n      <Logo theme={props.theme} />\n      <Tagline theme={props.theme} />\n    </React.Fragment>\n  );\n```\n\n---\n\n## Problems with passing props deep in the tree\n\nit is tedious and also not all components in between care about these values\n\n```jsx\n  <App>\n    <Header>\n      <Logo> {/* <-- actually needs theme */}\n    <Content>\n      <Article>\n        <Button> {/* <-- actually needs theme */}\n```\n\n---\n\n## Context\n\n```jsx\n  const ThemeContext = React.createContext('light');\n\n  const MyThemedApp = (props) => (\n    <ThemeContext.Provider value={props.theme}>\n        <Header />\n        <MainContent />\n        <Footer />\n    </ThemeContext.Provider>\n  );\n\n  const LogoInHeader = props => (\n    <ThemeContext.Consumer>\n      {(theme) => <img src={`/logos/${theme}.png`} />}\n    </ThemeContext.Consumer>\n  );\n```\n\n---\n\n## Context hook\n\n`createContext` and `Provider` are the same, only consuming is done using a hook\n\n```jsx\n  const ThemedButton = () => {\n    const themeName = React.useContext(ThemeContext);\n\n    return <button className={themeName}>Click here!</button>;\n  };\n```\n\n---\n\n## Using multiple contexts\n\n```jsx\n  const ThemedTranslatedButton = () => {\n    const theme = React.useContext(ThemeContext);\n    const texts = React.useContext(LanguageContext);\n\n    return (\n      <ThemeContext.Consumer>\n        {(theme) =>\n          <LanguageContext.Consumer>\n            {(texts) =>\n              <button style={theme.buttonStyles}>\n                {texts.buttonText}\n              </button>\n            }\n          </LanguageContext.Consumer>\n        }\n      </ThemeContext.Consumer>\n    );\n  }\n```\n\n---\n\n## Using multiple contexts with hooks\n\n```jsx\n  const ThemedTranslatedButton = () => {\n    const theme = React.useContext(ThemeContext);\n    const texts = React.useContext(LanguageContext);\n\n    return (\n      <button style={theme.buttonStyles}>\n        {texts.buttonText}\n      </button>);\n  }\n```\n\n---\n\n## Complex context values\n\nproviding object/array literals will force the entire subtree to re-render\n\n```jsx\n  const InefficientContext = () => (\n    <MyContext.Provider value={{ x: 0, y: 0 }}>\n      <App />\n    </MyContext.Provider>\n  );\n\n  const originPoint = { x: 0, y: 0 };\n  const CoordinatesApp = () => (\n    <MyContext.Provider value={originPoint}>\n      <App />\n    </MyContext.Provider>\n  );\n```\n\n---\n\n## Dynamic Context\n\n```jsx\n  const DynamicThemeContext = React.createContext();\n\n  const DynamicThemeProvider = (props) => {\n    const contextState = React.useState(props.initialTheme);\n    return (\n      <DynamicThemeContext.Provider value={contextState}>\n        {props.children}\n      </DynamicThemeContext.Provider>\n    );\n  };\n\n  const ThemeSwitch = () => {\n    const [theme, setTheme] = useContext(DynamicThemeContext);\n    const changeTheme = () => setTheme(oldTheme =>\n      oldTheme === 'light' ? 'dark' : 'light');\n    return <button onClick={changeTheme}>Toggle theme</button>;\n  };\n```\n\n---\n\n## Questions?\n"}}]);
//# sourceMappingURL=7.29a8bcdb.chunk.js.map