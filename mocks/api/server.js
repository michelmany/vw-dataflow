const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use('/api', router);

const port = 3001;
server.listen(port, () => {
  console.log(`🚀 JSON Server is running on http://localhost:${port}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET    http://localhost:${port}/api/users`);
  console.log(`   POST   http://localhost:${port}/api/users`);
  console.log(`   PUT    http://localhost:${port}/api/users/:id`);
  console.log(`   DELETE http://localhost:${port}/api/users/:id`);
});
