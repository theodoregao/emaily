if (process.env.NODE_ENV == 'production') {
  console.log('production environment');
  module.exports = require('./prod');
} else {
  console.log('development environment');
  module.exports = require('./dev');
}
