#!/usr/bin/env node

// module dependencies.
var app = require('../app')();
var http = require('http');

// get port from environment and store in express.
var port = normalizePort(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT  || '3000');
app.set('port', port);
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
// create http server.
var server = http.createServer(app);

// listen on provided port, on all network interfaces.
server.listen(port, server_ip_address);
server.on('error', onError);
server.on('listening', onListening);

// normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// event listener for http server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// event listener for http server "listening" event.
function onListening() {
  console.log('server started listening on port 3000');
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}

module.exports
