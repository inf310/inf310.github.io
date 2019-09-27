# Intro to Express

fast, unopinionated, minimalist web framework for Node.js

---

## Express Features

- Performant
- Extensible
- Versatile
- Easy to use

---

## Basic Node.js HTTP server

```js
const http = require('http');
const server = http.createServer((request, response) => {
  response.end('Hello World');
});
server.listen(8080);
```

---

## Express endpoints

```javascript
  const express = require('express');
  const api = express();

  api.get('/hello', (req, res) => {
    res.send('Hello World!');
  });

  api.listen(8076);
```

---

## Endpoint methods

```javascript
  const express = require('express');
  const api = express();

  api.get('/messages/:userId', async (req, res) => {
    const messages = await db.getByUserId(req.params.userId);
    res.json({ messages });
  });

  api.post('/messages', async (req, res) => {
    const userMessage = sanitize(req.body);
    const success = await db.saveMessage(userMessage);
    res.json({ success });
  });

  api.listen(8076);
```

---

## Middlewares

Requests can pass through any number of intermediate functions

```javascript
  const express = require('express');
  const api = express();

  api.use((req, res, next) => {
    const errors = validateRequest(req);
    if (errors) {
      next(errors); // short-circuit and proceed to the final error handler
    } else {
      next(); // continue processing the request
    }
  });

```

---

## Final error handler

a special middleware with 4 arguments,
any error passed to next is handled here

```js
  api.use((error, req, res, next) => {
    logger.record(error);
    res.status(500); // set the response status to indicate an error
    res.send('Something went wrong. Please try again.'); // send an error message to the user
  });
```

---

## Bootstrapping a project

Create simple applications using a popular template

```bash
  npm install -g express-generator
  express --no-view my-first-api
  cd my-first-api
  npm install
  npm run start
```

---

## Questions?
