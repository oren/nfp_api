'use strict';

var bookshelf = require('./bookshelf');
var bluebird  = require('bluebird');

var Page = bookshelf.Model.extend({
  tableName: 'pages',
  hasTimestamps: true,

  parent: function() {
    return this.belongsTo(Page, 'parent_id');
  },

  children: function() {
    return this.hasMany(Page, 'parent_id');
  }
},{
  getTree: bluebird.method(function() {
    return this.fetchAll({ withRelated: ['sub_pages'] });
  })
});

module.exports = Page;
