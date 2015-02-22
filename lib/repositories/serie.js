'use strict';

var bookshelf = require('./bookshelf');
var category = require('./category');
var release = require('./release');

var Serie = bookshelf.Model.extend({
  tableName: 'pages',
  hasTimestamps: true,

  category: function() {
    return this.belongsTo(category);
  },

  releases: function() {
    return this.hasMany(release);
  }
});

module.exports = Serie;
