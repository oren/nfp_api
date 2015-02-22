'use strict';

var bookshelf = require('./bookshelf');
var serie = require('./serie');

var Release = bookshelf.Model.extend({
  tableName: 'releases',
  hasTimestamps: true,

  series: function() {
    return this.belongsTo(serie);
  }
});

module.exports = Release;
