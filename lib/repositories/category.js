'use strict';

var bluebird  = require('bluebird');

var bookshelf = require('./bookshelf');
var serie = require('./serie');

var Category = bookshelf.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,

  children: function() {
    return this.hasMany(serie);
  }
},{
  getTree: bluebird.method(function() {
    return this.fetchAll({ withRelated: ['series'] });
  })
});

module.exports = Category;
