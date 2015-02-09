'use strict';

var bookshelf = require('./bookshelf');
var serie = require('./serie');

var Release = bookshelf.Model.extend({
  tableName: 'pages',

  series: function() {
    return this.belongsTo(serie);
  }
});

module.exports = Release;
