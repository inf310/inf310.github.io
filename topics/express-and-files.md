# Working with files in Express

---

## The fs module

```js
  const fs = require('fs');

  fs.writeFile('hello.txt', 'Hello file!', (error) => {
    if (error) { return console.error('Something went wrong'); }
  });

  fs.readFile('hello.txt', 'utf8', (error, contents) => {
    if (error) { return console.error('Something went wrong'); }

    console.log(contents);
  });
```

---

## Reading and sending files

```js
  api.get('/download/:fileName', (req, res) => {
    fs.readFile(req.params.fileName, 'utf8', (error, content) => {
      if (error) { res.send(`An error occurred: ${error.message}`); }
      else { res.send(content); }
    });
  });
```

---

## Using an in-memory cache

```js
  const cache = {};
  api.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;

    if (cache[fileName]) { return res.send(cache[fileName]); }

    fs.readFile(req.params.fileName, 'utf8', (error, content) => {
      if (error) { res.send(`An error occurred: ${error.message}`); }
      else { res.send(content); }
    });
  });
```

---

## Streaming files

```js
  api.get('/download/:fileName', (req, res) => {
    fs.createReadStream(req.params.fileName).pipe(res);
  });
```

---

## Static middleware

```js
  app.use(
    '/static',
    express.static(path.join(__dirname, 'public'))
  );
```

---

## Receiving data in request body

```js
  api.post('/', (req, res) => {
    const buffer = [];
    req.on('data', (data) => buffer.push(data));
    req.on('end', () => res.send(`received: ${buffer.join('')}`));
  });
```

---

## body-parser middleware

```bash
  npm install body-parser
```

-- api.js --

```js
  const bodyParser = require('body-parser');

  api.use(bodyParser.json());

  api.post('/form', (req, res) => {
    fs.writeFile('form-data.json', req.body, (error) => {
      if (error) { res.status(500).send('something went wrong'); }
      else { res.send('form received'); }
    });
  });
```

---

## Streaming data to a file

```js
  api.post('/save-from-stream', (req, res) => {
    req.pipe(fs.createWriteStream('my-file.txt'))
      .on('finish', () => res.send('done'));
  });
```

---

## Questions?
