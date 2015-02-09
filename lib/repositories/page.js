'use strict';

var bookshelf = require('./bookshelf');
var bluebird  = require('bluebird');

var Page = bookshelf.Model.extend({
  tableName: 'pages',

  sub_pages: function() {
    return this.hasMany(Page);
  }
},{
  getTree: bluebird.method(function() {
    return new this().fetch({ withRelated: ['sup_pages'] });
  })
});

module.exports = Page;
