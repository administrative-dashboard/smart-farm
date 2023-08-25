const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add a custom middleware to include the Content-Range header
server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.startsWith('/greenhouses')) {
    // Replace these values with the appropriate range and total count
    const range = '0-2';
    const totalCount = 10;
    res.setHeader('Content-Range', `items ${range}/${totalCount}`);
  }
  next();
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running');
});
