/**
 * Normalize a port into a number, string, or false.
 *
 * @param {*} val
 * @returns
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = {
  normalizePort,
};
