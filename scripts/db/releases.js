'use strict';

var _ = require('lodash');

module.exports = function(knex, logger) {
  return knex.schema.hasTable('releases').then(function(exists) {
    if (exists) {
      return test(knex).then(function(tests) {
        if (!_.every(tests)) {
          logger.warn('DB schema releases was missing some required columns, upgrading');
          return upgrade(knex, logger);
        }
        logger.info('DB schema releases is up to date');
      });
    }
    return create(knex, logger).then(function() {
      logger.info('DB schema releases is up to date');
    });
  })
};

function test(knex) {
  return Promise.all([
    knex.schema.hasColumn('releases', 'id'),
    knex.schema.hasColumn('releases', 'name'),
    knex.schema.hasColumn('releases', 'description'),
    knex.schema.hasColumn('releases', 'created_at'),
    knex.schema.hasColumn('releases', 'updated_at')
  ]);
}

function create(knex, logger) {
  logger.warn('Creating table releases');
  return knex.schema.createTable('releases', function(table) {
    table.increments();
    table.string('name');
    table.string('description');
    table.timestamps();
  });
}

function upgrade(knex, logger) {
  logger.warn('Removing table releases');
  return knex.schema.dropTable('releases').then(function(){
    return create(knex, logger);
  });
}
