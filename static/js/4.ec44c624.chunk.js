(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{885:function(n,e){n.exports="# Intro to Express\n\nfast, unopinionated, minimalist web framework for Node.js\n\n---\n\n## Express Features\n\n- Performant\n- Extensible\n- Versatile\n- Easy to use\n\n---\n\n## Basic Node.js HTTP server\n\n```js\nconst http = require('http');\nconst server = http.createServer((request, response) => {\n  response.end('Hello World');\n});\nserver.listen(8080);\n```\n\n---\n\n## Express endpoints\n\n```javascript\n  const express = require('express');\n  const api = express();\n\n  api.get('/hello', (req, res) => {\n    res.send('Hello World!');\n  });\n\n  api.listen(8076);\n```\n\n---\n\n## Endpoint methods\n\n```javascript\n  const express = require('express');\n  const api = express();\n\n  api.get('/messages/:userId', async (req, res) => {\n    const messages = await db.getByUserId(req.params.userId);\n    res.json({ messages });\n  });\n\n  api.post('/messages', async (req, res) => {\n    const userMessage = sanitize(req.body);\n    const success = await db.saveMessage(userMessage);\n    res.json({ success });\n  });\n\n  api.listen(8076);\n```\n\n---\n\n## Middlewares\n\nRequests can pass through any number of intermediate functions\n\n```javascript\n  const express = require('express');\n  const api = express();\n\n  api.use((req, res, next) => {\n    const errors = validateRequest(req);\n    if (errors) {\n      next(errors); // short-circuit and proceed to the final error handler\n    } else {\n      next(); // continue processing the request\n    }\n  });\n\n```\n\n---\n\n## Final error handler\n\na special middleware with 4 arguments,\nany error passed to next is handled here\n\n```js\n  api.use((error, req, res, next) => {\n    logger.record(error);\n    res.status(500); // set the response status to indicate an error\n    res.send('Something went wrong. Please try again.'); // send an error message to the user\n  });\n```\n\n---\n\n## Bootstrapping a project\n\nCreate simple applications using a popular template\n\n```bash\n  npm install -g express-generator\n  express --no-view my-first-api\n  cd my-first-api\n  npm install\n  npm run start\n```\n\n---\n\n## Questions?\n"}}]);
//# sourceMappingURL=4.ec44c624.chunk.js.map