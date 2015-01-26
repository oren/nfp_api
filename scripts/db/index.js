'use strict';

module.exports = function(knex, logger) {
  return [
    require('./releases')(knex, logger)
  ];
}
