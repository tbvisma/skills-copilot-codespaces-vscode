// Create web server
// 1. Create a web server using the http module
// 2. Create a route for the path /comments
// 3. When a GET request is made to the /comments route, read the comments.json file and respond with the parsed JSON object
// 4. When a POST request is made to the /comments route, read the comments.json file, parse the JSON object, and add the new comment to the comments array. Then write the comments array back to the comments.json file
// 5. Listen on port 3000
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/comments') {
      fs.readFile('./comments.json', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error reading comments.json');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
    if (req.url === '/comments') {
      fs.readFile('./comments.json', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error reading comments.json');
          return;
        }

        const comments = JSON.parse(data);
        const comment = { date: new Date(), text: 'Hello, world!' };
        comments.push(comment);

        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Error writing comments.json');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(comment));
        });
      });
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});