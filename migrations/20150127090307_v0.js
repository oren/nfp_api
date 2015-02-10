'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.enu('status', ['approved', 'pending', 'spam', 'trash']);
      table.string('username');
      table.string('name');
      table.string('email');
      table.string('password');
      table.string('url');
      table.string('ip');
      table.string('text');
      table.timestamps();
    }),
    knex.schema.createTable('news', function(table) {
      table.increments();
      table.integer('user_id').references('users.id').notNullable();
      table.string('title');
      table.string('slug');
      table.string('text');
      table.json('meta', true);
      table.json('media', true);
      table.timestamp('ends');
      table.timestamps();
    }),
    knex.schema.createTable('pages', function(table) {
      table.increments();
      table.integer('user_id').references('users.id').notNullable();
      table.integer('parent_id').references('pages.id');
      table.string('title');
      table.string('slug');
      table.string('text');
      table.json('meta', true);
      table.json('media', true);
      table.timestamps();
    }),
    knex.schema.createTable('categories', function(table) {
      table.increments();
      table.string('title');
      table.string('slug');
      table.integer('sort');
      table.json('meta', true);
      table.json('media', true);
      table.timestamps();
    }),
    knex.schema.createTable('series', function(table) {
      table.increments();
      table.integer('category_id').references('categories.id').notNullable();
      table.string('title');
      table.string('slug');
      table.string('text');
      table.json('meta', true);
      table.json('media', true);
      table.timestamps();
    }),
    knex.schema.createTable('releases', function(table) {
      table.increments();
      table.integer('series_id').references('series.id').notNullable();
      table.integer('user_id').references('users.id');
      table.string('title');
      table.string('slug');
      table.string('text');
      table.json('links', true);
      table.json('files', true);
      table.json('meta', true);
      table.json('media', true);
      table.timestamps();
    }),
    knex.schema.createTable('comments', function(table) {
      table.increments();
      table.integer('release_id').references('releases.id').notNullable();
      table.integer('user_id').references('users.id');
      table.string('name');
      table.string('email');
      table.string('url');
      table.string('ip');
      table.string('text');
      table.enu('status', ['approved', 'pending', 'spam', 'trash']);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('releases'),
    knex.schema.dropTable('series'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('news'),
    knex.schema.dropTable('pages'),
    knex.schema.dropTable('users'),
  ]);
};
