var config = require('../../config');
var log = require('../../log');

log.info('Connected to DB on', config.get('knex').connection.host);
var knex = require('knex')(config.get('knex'));

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
