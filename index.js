var config = require('./config');
var log = require('./log');



if (config.get('NODE_ENV') === 'production') {
  require('./app');
  return;
}

log.info('Running in development mode, running database integrity scan.');

var setup = require('./scripts/setup');

setup().then(function() {
  require('./app');
}).catch(function(error) {
  log.error(error, 'Error while preparing database');
  process.exit(1);
});
