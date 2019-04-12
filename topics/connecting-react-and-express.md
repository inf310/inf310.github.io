# Connection Express and React

---

## Running separately

Add a `proxy` property to your React app's `package.json`

```js
  "proxy": "http://localhost:5000/",
```

Then run your Express and React apps separately
```bash
  cd express-app/
  npm run start

  cd ../react-app/
  npm run start
```

---

## Benefits of running separately

- static front-end hosting
- independent scaling
- separation of concerns

---

## Serving React through express (statically)

build your react app for production

```bash
cd react-app/
npm run build
```

---

## Serving React through express (statically)

then copy the files from build to the public folder in you express project

```bash
  cp -r build/* /path/to/express-app/public/
```

---

## Serving React through express (statically)

make sure express is serving the static files
```js
  app.use(express.static(path.join(__dirname, 'public')));
```

---

## Server-side rendering (SSR)

---

## Questions
