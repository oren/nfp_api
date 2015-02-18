'use strict';

var bluebird  = require('bluebird');
var bcrypt = require('bcrypt');
var bookshelf = require('./bookshelf');
var page = require('./page');
var release = require('./release');

bluebird.promisifyAll(bcrypt);

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  pages: function() {
    return this.hasMany(page);
  },

  releases: function() {
    return this.hasMany(release);
  }
},{
  createUser: bluebird.method(function(user) {
    return this.forge(user).save();
  }),

  loginUser: bluebird.method(function(user, password) {
    user = user.toLowerCase().trim();
    return this.query({where: {email: user}, orWhere: {username: user}})
      .fetchOne({require: true})
      .tap(function(user) {
        return bcrypt.compareAsync(user.get('password'), password);
      });
  })
});

module.exports = User;