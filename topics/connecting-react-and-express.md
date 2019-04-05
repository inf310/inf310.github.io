# Connection Express and React

---

## Running separately

Add a `proxy` property to your React app's `package.json`

```js
  "proxy": "http://localhost:5000/",
```

Then run your Express and Express apps
```bash
  cd express-app/
  npm run start

  cd ../react-app/
  npm run start
```

---

## Demo
