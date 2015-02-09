'use strict';

var user = require('../repositories/user');

function* authenticate() {
  /*jshint validthis: true */
  this.status = 401;
  this.body = {user: null};
  //this.throw(401, {user: null});
}
exports.authenticate = authenticate;
