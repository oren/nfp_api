'use strict';

var bluebird = require('bluebird');
var jwt = require('jsonwebtoken');
var config = require('../config');
jwt.verifyAsync = bluebird.promisify(jwt.verify);

function sign(value) {
  return jwt.sign(value, config.get('jwt:secret'), config.get('jwt:options'));
}
exports.sign = sign;

function verify(token) {
  return jwt.verifyAsync(token, config.get('jwt:secret'), null);
}
exports.verify = verify;

function createUserToken(user) {
  return sign({
    id: user.id,
    admin: true
  });
}
exports.createUserToken = createUserToken;
