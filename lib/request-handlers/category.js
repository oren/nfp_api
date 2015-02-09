'use strict';

var category = require('../repositories/category');

function* categories() {
  /*jshint validthis: true */
  yield category.getCategories();
  this.body = [
    {name:  'test'},
    {name:  'bla'},
    {name:  'test2'}
  ];
}
exports.categories = categories;
