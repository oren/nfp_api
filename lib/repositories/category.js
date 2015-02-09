'use strict';

var bluebird  = require('bluebird');

var bookshelf = require('./bookshelf');
var serie = require('./serie');

var Category = bookshelf.Model.extend({
  tableName: 'categories',

  series: function() {
    return this.hasMany(serie);
  }
},{
  getTree: bluebird.method(function() {
    return new this().fetch({ withRelated: ['series'] });
  })
});

module.exports = Category;
