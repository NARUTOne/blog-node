#!/usr/bin/env node

/**
 * app start server
 */

const debug = require('debug')('node-blog:server');
const http = require('http');
const app = require('../src/app');
const utils = require('../src/utils/utils');

const port = utils.normalizePort(
  process.argv.slice(2)[0] || process.env.PORT || '3001',
);

app.set('port', port);

// create http server
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  const host = server.address().address;
  const sport = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, sport);
});

// 监听error
server.on('error', onError);

// 正在监听
server.on('listening', onListening);
