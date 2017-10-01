require('babel-register');

const pm2 = require('pm2');

process.env.PORT = normalizePort(process.env.PORT || 3000);

pm2.connect(function () {
  pm2.start({
    script: './src/app.js',
    instances: 4,
    max_memory_restart: '150M'
  }, function (err, apps) {
    if (err) {
      console.log('pm2.connect(app.js)', err);
      console.trace(err);
    }
  });
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val) {
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
